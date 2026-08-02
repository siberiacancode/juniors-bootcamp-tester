import { useInfiniteQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

import { getGamesInfo, getGamesInfoQueryKey } from '@/generated/api';

const catalogRoute = getRouteApi('/(layout)/');

export const useCatalogContent = () => {
  const searchParams = catalogRoute.useSearch();

  const getGamesInfoQuery = useInfiniteQuery({
    queryKey: [getGamesInfoQueryKey, searchParams],
    queryFn: ({ pageParam }) =>
      getGamesInfo({
        query: {
          limit: 12,
          page: pageParam,
          ...searchParams
        }
      }),
    initialPageParam: 1,
    getNextPageParam: ({ data }) =>
      data.meta.page < data.meta.totalPages ? data.meta.page + 1 : null
  });

  const games = getGamesInfoQuery.data?.pages.flatMap((group) => group.data.games) ?? [];

  return {
    state: {
      games,
      hasNextPage: getGamesInfoQuery.hasNextPage,
      isFetching: getGamesInfoQuery.isFetching,
      isFetchingNextPage: getGamesInfoQuery.isFetchingNextPage,
      isError: getGamesInfoQuery.isError,
      isLoading: getGamesInfoQuery.isLoading
    },
    functions: {
      fetchNextPage: () => getGamesInfoQuery.fetchNextPage()
    }
  };
};
