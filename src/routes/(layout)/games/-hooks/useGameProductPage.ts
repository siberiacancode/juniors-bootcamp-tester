import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi, useRouterState } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import type { DeliveryType, Region } from '@/generated/api';

import {
  getGamesEditionsSuspenseQueryOptions,
  getGamesInfoBySlugSuspenseQueryOptions,
  getGamesRegionsSuspenseQueryOptions
} from '@/generated/api';

import type { ProductCheckoutFormValues } from '../-constants';

import { productCheckoutFormSchema } from '../-constants';

const gameRoute = getRouteApi('/(layout)/games/$slug');

export const useGameProductPage = () => {
  const params = gameRoute.useParams();
  const navigate = gameRoute.useNavigate();
  const { selectedDeliveryType, selectedRegion, selectedEdition } = gameRoute.useLoaderData();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const isRouteLoading = useRouterState({
    select: (state) => state.isLoading
  });

  const getGameInfoBySlugQuery = useSuspenseQuery(
    getGamesInfoBySlugSuspenseQueryOptions({
      request: {
        path: {
          slug: params.slug
        }
      }
    })
  );

  const game = getGameInfoBySlugQuery.data.data.game;

  const getGamesRegionsQuery = useSuspenseQuery(
    getGamesRegionsSuspenseQueryOptions({
      request: {
        query: {
          slug: game.slug,
          deliveryType: selectedDeliveryType
        }
      }
    })
  );

  const getGamesEditionsQuery = useSuspenseQuery(
    getGamesEditionsSuspenseQueryOptions({
      request: {
        query: {
          slug: game.slug,
          deliveryType: selectedDeliveryType,
          region: selectedRegion
        }
      }
    })
  );

  const gameProductForm = useForm<ProductCheckoutFormValues>({
    defaultValues: {
      email: '',
      inviteLink: '',
      paymentMethod: 'card',
      phone: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(productCheckoutFormSchema)
  });

  const onSubmit = gameProductForm.handleSubmit(async (values) => {
    await navigate({
      to: '/payment',
      search: {
        amount: 4680,
        deliveryType: selectedDeliveryType,
        edition: selectedEdition,
        gameSlug: game.slug,
        email: values.email,
        ...(values.inviteLink && { inviteLink: values.inviteLink }),
        phone: values.phone,
        region: selectedRegion
      }
    });
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => gameProductForm.setValue('phone', rawValue),
    tokens: {
      '7': /7/
    }
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
    game,
    state: {
      editions: getGamesEditionsQuery.data.data.editions.flat(),
      isDesktop,
      isInviteLinkAvailable: selectedDeliveryType === 'steam_gift',
      isRouteLoading,
      regions: getGamesRegionsQuery.data.data.regions,
      selectedDeliveryType,
      selectedEdition,
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
    form: gameProductForm
  };
};
