import { getRouteApi } from '@tanstack/react-router';

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

  return {
    state: {
      order: getGamesOrderByOrderIdSuspenseQuery.data.data.order!
    }
  };
};
