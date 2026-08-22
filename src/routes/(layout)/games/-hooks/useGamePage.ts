import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { keepPreviousData } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateGameOrderDto } from '@/generated/api';

import {
  GameDeliveryType,
  GameRegion,
  TransactionPayMethod,
  useGetCardsCardsQuery,
  useGetGamesInfoBySlugQuery,
  useGetGamesPriceVariantsQuery,
  useGetGamesRegionsQuery,
  useGetUsersProfileQuery,
  usePostGamesOrderMutation
} from '@/generated/api';
import { getPaymentServiceUrl } from '@/utils/helpers';

import type { GameCheckoutFormValues } from '../-constants';

import { gameCheckoutFormSchema } from '../-constants';
import { getRequirementSections, productMetaItems } from '../-helpers';

const gameRoute = getRouteApi('/(layout)/games/$slug');

interface SavedPaymentCard {
  id: string;
  panmask: string;
  title: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const getStringValue = (source: Record<string, unknown>, keys: string[]) => {
  const value = keys.map((key) => source[key]).find((value) => typeof value === 'string');

  return typeof value === 'string' ? value : undefined;
};

const normalizeSavedPaymentCard = (value: unknown): SavedPaymentCard | null => {
  if (!isRecord(value)) return null;

  const id = getStringValue(value, ['id', '_id', 'cardId']);
  const panmask = getStringValue(value, ['panmask', 'panMask', 'panMasked', 'mask', 'maskedPan']);

  if (!id || !panmask) return null;

  return {
    id,
    panmask,
    title: getStringValue(value, ['title', 'label', 'name']) ?? 'Карта'
  };
};

const getSavedPaymentCards = (source?: unknown) => {
  if (!source) return [];

  if (Array.isArray(source)) {
    return source
      .map((card) => normalizeSavedPaymentCard(card))
      .filter((card): card is SavedPaymentCard => !!card);
  }

  if (!isRecord(source)) return [];

  const cards = source.savedCards ?? source.paymentCards ?? source.cards;

  if (!Array.isArray(cards)) return [];

  return cards
    .map((card) => normalizeSavedPaymentCard(card))
    .filter((card): card is SavedPaymentCard => !!card);
};

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

  const game = getGameInfoBySlugQuery.data?.data.game;
  const postGamesOrderMutation = usePostGamesOrderMutation();
  const getUsersProfileQuery = useGetUsersProfileQuery({
    params: {
      enabled: false
    }
  });
  const user = getUsersProfileQuery.data?.data.user;
  const getCardsCardsQuery = useGetCardsCardsQuery({
    params: {
      enabled: !!user
    }
  });
  const cardsResponse = getCardsCardsQuery.data?.data;
  const savedCards = useMemo(() => {
    const savedCards = getSavedPaymentCards(cardsResponse);

    return savedCards.length ? savedCards : getSavedPaymentCards(user);
  }, [cardsResponse, user]);
  const [defaultDeliveryType] = game?.deliveryTypes ?? [];

  const selectedDeliveryType =
    game && search.deliveryType && game.deliveryTypes.includes(search.deliveryType)
      ? search.deliveryType
      : defaultDeliveryType;

  const getGamesRegionsQuery = useGetGamesRegionsQuery({
    request: {
      query: {
        slug: game?.slug ?? '',
        deliveryType: selectedDeliveryType ?? GameDeliveryType.STEAM_KEY
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
        deliveryType: selectedDeliveryType ?? GameDeliveryType.STEAM_KEY,
        region: selectedRegion ?? GameRegion.RU
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
      paymentMethod: TransactionPayMethod.NEW_CARD,
      savedCardId: '',
      phone: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(gameCheckoutFormSchema)
  });
  const selectedPaymentMethod = gameCheckoutForm.watch('paymentMethod');
  const selectedSavedCardId = gameCheckoutForm.watch('savedCardId');
  const selectedSavedCard = savedCards.find((card) => card.id === selectedSavedCardId);

  useEffect(() => {
    if (selectedPaymentMethod !== TransactionPayMethod.SAVED_CARD) return;
    if (selectedSavedCard) return;

    gameCheckoutForm.setValue('paymentMethod', TransactionPayMethod.NEW_CARD);
    gameCheckoutForm.setValue('savedCardId', '');
  }, [gameCheckoutForm, selectedPaymentMethod, selectedSavedCard]);

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

    const savedCard =
      values.paymentMethod === TransactionPayMethod.SAVED_CARD
        ? savedCards.find((card) => card.id === values.savedCardId)
        : undefined;
    const paymentMethod =
      values.paymentMethod === TransactionPayMethod.SAVED_CARD
        ? (savedCard && TransactionPayMethod.SAVED_CARD) || TransactionPayMethod.NEW_CARD
        : values.paymentMethod;

    window.location.assign(
      getPaymentServiceUrl({
        backUrl: new URL(
          `${import.meta.env.BASE_URL.replace(/\/$/, '')}/payment`,
          window.location.origin
        ).toString(),
        cardId: savedCard?.id,
        panmask: savedCard?.panmask,
        transactionId,
        type: paymentMethod
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

  const onPaymentMethodChange = (paymentMethod: TransactionPayMethod) => {
    gameCheckoutForm.setValue('paymentMethod', paymentMethod);

    if (paymentMethod !== TransactionPayMethod.SAVED_CARD) {
      gameCheckoutForm.setValue('savedCardId', '');
    }
  };

  const onSavedCardChange = (cardId?: string) => {
    gameCheckoutForm.setValue(
      'paymentMethod',
      cardId ? TransactionPayMethod.SAVED_CARD : TransactionPayMethod.NEW_CARD
    );
    gameCheckoutForm.setValue('savedCardId', cardId ?? '');
  };

  return {
    state: {
      game: game!,
      // Описание игры вынесено из JSX в state согласно конвенции страниц.
      metaItems: game ? productMetaItems(game) : [],
      requirementSections: game ? getRequirementSections(game) : [],
      editions: priceVariants.map((variant) => variant.edition),
      isDesktop,
      isInviteLinkAvailable: selectedDeliveryType === GameDeliveryType.STEAM_GIFT,
      isPaymentStarting:
        postGamesOrderMutation.isPending || gameCheckoutForm.formState.isSubmitting,
      isSelectionLoading,
      isSelectionReady,
      regions,
      savedCards,
      selectedDeliveryType: selectedDeliveryType!,
      selectedPaymentMethod,
      selectedPriceVariant: selectedPriceVariant!,
      selectedRegion: selectedRegion!,
      selectedSavedCard
    },
    functions: {
      onSubmit,
      onDeliveryTypeChange,
      onEditionChange,
      onPaymentMethodChange,
      onRegionChange,
      onSavedCardChange
    },
    features: {
      phoneMask
    },
    form: gameCheckoutForm
  };
};
