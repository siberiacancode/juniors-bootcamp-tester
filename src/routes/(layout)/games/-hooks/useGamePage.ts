import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { keepPreviousData } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import type { CreateGameOrderDto, GameDeliveryType, GameRegion } from '@/generated/api';

import {
  useGetGamesInfoBySlugQuery,
  useGetGamesPriceVariantsQuery,
  useGetGamesRegionsQuery,
  usePostGamesOrderMutation
} from '@/generated/api';
import { getPaymentServiceUrl } from '@/helpers/utils';

import type { GameCheckoutFormValues } from '../-constants';

import { gameCheckoutFormSchema } from '../-constants';
import { getRequirementSections, productMetaItems } from '../-helpers';

const gameRoute = getRouteApi('/(layout)/games/$slug');

export const useGamePage = () => {
  const params = gameRoute.useParams();
  const search = gameRoute.useSearch();
  const navigate = gameRoute.useNavigate();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const getGameInfoBySlugQuery = useGetGamesInfoBySlugQuery({
    request: {
      path: {
        slug: params.slug
      }
    }
  });

  console.log('@', getGameInfoBySlugQuery);

  const game = getGameInfoBySlugQuery.data?.data.game;
  const postGamesOrderMutation = usePostGamesOrderMutation();
  const [defaultDeliveryType] = game?.deliveryTypes ?? [];

  const selectedDeliveryType =
    game && search.deliveryType && game.deliveryTypes.includes(search.deliveryType)
      ? search.deliveryType
      : defaultDeliveryType;

  const getGamesRegionsQuery = useGetGamesRegionsQuery({
    request: {
      query: {
        slug: game?.slug ?? '',
        deliveryType: selectedDeliveryType ?? 'steam_key'
      }
    },
    params: {
      enabled: !!game && !!selectedDeliveryType,
      placeholderData: keepPreviousData
    }
  });

  const regions = getGamesRegionsQuery.data?.data.regions ?? [];
  const [defaultRegion] = regions;
  const selectedRegion =
    search.region && regions.includes(search.region) ? search.region : defaultRegion;

  const getGamesPriceVariantsQuery = useGetGamesPriceVariantsQuery({
    request: {
      query: {
        slug: game?.slug ?? '',
        deliveryType: selectedDeliveryType ?? 'steam_key',
        region: selectedRegion ?? 'ru'
      }
    },
    params: {
      enabled: !!game && !!selectedDeliveryType && !!selectedRegion,
      placeholderData: keepPreviousData
    }
  });

  const priceVariants = getGamesPriceVariantsQuery.data?.data.priceVariants ?? [];
  const [defaultPriceVariant] = priceVariants;
  const selectedPriceVariant =
    priceVariants.find((priceVariant) => priceVariant.edition === search.edition) ??
    defaultPriceVariant;

  const isSelectionLoading =
    getGamesRegionsQuery.isFetching || getGamesPriceVariantsQuery.isFetching;
  // Данные выбора готовы к чтению (region/priceVariant существуют).
  // Пока идёт рефетч после смены deliveryType/region/edition — показываем
  // частичные скелетоны в блоках selection/checkout вместо чтения .price/.edition.
  const isSelectionReady = !!selectedRegion && !!selectedPriceVariant;

  const gameCheckoutForm = useForm<GameCheckoutFormValues>({
    defaultValues: {
      email: '',
      inviteLink: '',
      paymentMethod: 'card',
      phone: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(gameCheckoutFormSchema)
  });

  const onSubmit = gameCheckoutForm.handleSubmit(async (values) => {
    gameCheckoutForm.clearErrors('root');

    if (!game || !selectedDeliveryType || !selectedRegion || !selectedPriceVariant) {
      gameCheckoutForm.setError('root', {
        message: 'Не удалось получить данные для оформления заказа'
      });
      return;
    }

    const postGamesOrderResponse = await postGamesOrderMutation.mutateAsync({
      body: {
        deliveryType: selectedPriceVariant.deliveryType,
        edition: selectedPriceVariant.edition,
        gameSlug: game.slug,
        person: {
          email: values.email,
          phone: values.phone,
          ...(values.inviteLink && { inviteLink: values.inviteLink })
        },
        region: selectedPriceVariant.region
      } satisfies CreateGameOrderDto
    });

    if (!postGamesOrderResponse.data.success) {
      gameCheckoutForm.setError('root', {
        message: postGamesOrderResponse.data.reason || 'Не удалось создать заказ'
      });
      return;
    }

    const transactionId =
      postGamesOrderResponse.data.transaction._id ??
      postGamesOrderResponse.data.order.transactionId;

    if (!transactionId) {
      gameCheckoutForm.setError('root', {
        message: 'Не удалось получить транзакцию для оплаты'
      });
      return;
    }

    window.location.assign(
      getPaymentServiceUrl({
        backUrl: new URL(
          `${import.meta.env.BASE_URL.replace(/\/$/, '')}/payment`,
          window.location.origin
        ).toString(),
        transactionId,
        type: values.paymentMethod
      })
    );
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => gameCheckoutForm.setValue('phone', `7${rawValue}`)
  });

  const onDeliveryTypeChange = (deliveryType: GameDeliveryType) => {
    navigate({
      resetScroll: false,
      search: (search) => ({
        ...search,
        deliveryType,
        region: undefined,
        edition: undefined
      })
    });
  };

  const onRegionChange = (region: GameRegion) => {
    navigate({
      resetScroll: false,
      search: (search) => ({
        ...search,
        region,
        edition: undefined
      })
    });
  };

  const onEditionChange = (edition: string) => {
    navigate({
      resetScroll: false,
      search: (search) => ({
        ...search,
        edition
      })
    });
  };

  return {
    state: {
      game: game!,
      // Описание игры вынесено из JSX в state согласно конвенции страниц.
      metaItems: game ? productMetaItems(game) : [],
      requirementSections: game ? getRequirementSections(game) : [],
      editions: priceVariants.map((variant) => variant.edition),
      isDesktop,
      isInviteLinkAvailable: selectedDeliveryType === 'steam_gift',
      isPaymentStarting:
        postGamesOrderMutation.isPending || gameCheckoutForm.formState.isSubmitting,
      isSelectionLoading,
      isSelectionReady,
      regions,
      selectedDeliveryType: selectedDeliveryType!,
      selectedPriceVariant: selectedPriceVariant!,
      selectedRegion: selectedRegion!
    },
    functions: {
      onSubmit,
      onDeliveryTypeChange,
      onEditionChange,
      onRegionChange
    },
    features: {
      phoneMask
    },
    form: gameCheckoutForm
  };
};
