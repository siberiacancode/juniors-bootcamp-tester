import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { getRouteApi, useRouterState } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import type { DeliveryType, Region } from '@/generated/api';

import {
  useGetGamesInfoBySlugSuspenseQuery,
  useGetGamesPriceVariantsSuspenseQuery,
  useGetGamesRegionsSuspenseQuery
} from '@/generated/api';

import type { GameCheckoutFormValues } from '../-constants';

import { gameCheckoutFormSchema } from '../-constants';

const gameRoute = getRouteApi('/(layout)/games/$slug');

export const useGamePage = () => {
  const params = gameRoute.useParams();
  const navigate = gameRoute.useNavigate();

  const { selectedDeliveryType, selectedRegion, selectedPriceVariant } = gameRoute.useLoaderData();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const isRouteLoading = useRouterState({
    select: (state) => state.isLoading
  });

  const getGameInfoBySlugQuery = useGetGamesInfoBySlugSuspenseQuery({
    request: {
      path: {
        slug: params.slug
      }
    }
  });

  const game = getGameInfoBySlugQuery.data.data.game;

  const getGamesRegionsQuery = useGetGamesRegionsSuspenseQuery({
    request: {
      query: {
        slug: game.slug,
        deliveryType: selectedDeliveryType
      }
    }
  });

  const getGamesPriceVariantsQuery = useGetGamesPriceVariantsSuspenseQuery({
    request: {
      query: {
        slug: game.slug,
        deliveryType: selectedDeliveryType,
        region: selectedRegion
      }
    }
  });

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
    await navigate({
      to: '/payment',
      search: {
        amount: selectedPriceVariant.price,
        deliveryType: selectedPriceVariant.deliveryType,
        edition: selectedPriceVariant.edition,
        gameSlug: game.slug,
        email: values.email,
        ...(values.inviteLink && { inviteLink: values.inviteLink }),
        phone: values.phone,
        region: selectedPriceVariant.region
      }
    });
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => gameCheckoutForm.setValue('phone', `7${rawValue}`)
  });

  const onDeliveryTypeChange = (deliveryType: DeliveryType) => {
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

  const onRegionChange = (region: Region) => {
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
      game,
      editions: getGamesPriceVariantsQuery.data.data.priceVariants.map(
        (variant) => variant.edition
      ),
      isDesktop,
      isInviteLinkAvailable: selectedDeliveryType === 'steam_gift',
      isRouteLoading,
      regions: getGamesRegionsQuery.data.data.regions,
      selectedDeliveryType,
      selectedPriceVariant,
      selectedRegion
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
