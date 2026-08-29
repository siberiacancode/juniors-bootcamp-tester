import { getRouteApi } from '@tanstack/react-router';

import type { GameOrderResponse } from '@/generated/api';

import { useGetGamesOrderByOrderIdSuspenseQuery } from '@/generated/api';

const historyOrderRoute = getRouteApi('/(layout)/_authenticated/history/$orderId/');

export const useHistoryOrderPage = () => {
  const params = historyOrderRoute.useParams();

  const getGamesOrderByOrderIdSuspenseQuery = useGetGamesOrderByOrderIdSuspenseQuery({
    request: {
      path: {
        orderId: params.orderId
      }
    }
  });

  const getGamesOrderByOrderIdData = getGamesOrderByOrderIdSuspenseQuery.data
    .data as GameOrderResponse;

  return {
    state: {
      order: getGamesOrderByOrderIdData.order!
    }
  };
};
