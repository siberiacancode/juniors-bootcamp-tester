import { zodResolver } from '@hookform/resolvers/zod';
import { useMask, useMediaQuery } from '@siberiacancode/reactuse';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi, useRouterState } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import type { CreateGameOrderDto, DeliveryType, DetailedGame, Region } from '@/generated/api';

import {
  getGamesEditionsSuspenseQueryOptions,
  getGamesRegionsSuspenseQueryOptions,
  usePostGamesOrderMutation
} from '@/generated/api';

import type { ProductCheckoutFormValues } from '../-constants';

import { productCheckoutFormSchema } from '../-constants';

const gameRoute = getRouteApi('/(layout)/games/$slug');

export const useProductOrder = (game: DetailedGame) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = gameRoute.useNavigate();
  const postGamesOrderMutation = usePostGamesOrderMutation();

  const { selectedDeliveryType, selectedRegion, selectedEdition } = gameRoute.useLoaderData();

  const isRouteLoading = useRouterState({
    select: (state) => state.isLoading
  });

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

  const productOrderForm = useForm<ProductCheckoutFormValues>({
    defaultValues: {
      bindJbPay: false,
      email: '',
      inviteLink: '',
      paymentMethod: 'jb-pay',
      payWithoutBinding: true,
      phone: ''
    },
    mode: 'onSubmit',
    resolver: zodResolver(productCheckoutFormSchema)
  });

  const onSubmit = productOrderForm.handleSubmit(async (values) => {
    const createGameOrderResponse = await postGamesOrderMutation.mutateAsync({
      body: {
        debitCard: values.paymentMethod,
        deliveryType: selectedDeliveryType,
        edition: selectedEdition,
        gameSlug: game.slug,
        person: {
          email: values.email,
          phone: values.phone,
          ...(values.inviteLink && { inviteLink: values.inviteLink })
        },
        region: selectedRegion
      } satisfies CreateGameOrderDto
    });

    if (!createGameOrderResponse.data.success) {
      return;
    }

    const order = createGameOrderResponse.data.order;

    await navigate({
      to: '/payment',
      search: {
        amount: order.gameSnapshot.price,
        deliveryType: selectedDeliveryType,
        edition: selectedEdition,
        gameSlug: game.slug,
        email: values.email,
        orderNumber: order._id,
        phone: values.phone,
        region: selectedRegion
      }
    });
  });

  const phoneMask = useMask('+7 999 999 99 99', {
    showMask: 'never',
    onChangeRaw: (rawValue) => productOrderForm.setValue('phone', rawValue),
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
    state: {
      editions: getGamesEditionsQuery.data.data.editions.flat(),
      isCreatingOrder: postGamesOrderMutation.isPending,
      isDesktop,
      isInviteLinkAvailable: selectedDeliveryType === 'steam_gift',
      isRouteLoading,
      regions: getGamesRegionsQuery.data.data.regions,
      selectedDeliveryType,
      selectedEdition,
      selectedRegion
    },
    features: {
      phoneMask
    },
    functions: {
      onSubmit,
      onDeliveryTypeChange,
      onEditionChange,
      onRegionChange
    },
    form: productOrderForm
  };
};
