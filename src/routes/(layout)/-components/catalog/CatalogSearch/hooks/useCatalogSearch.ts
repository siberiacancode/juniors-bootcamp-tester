import { useClickOutside, useDebounceValue, useDisclosure } from '@siberiacancode/reactuse';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';

import { getGamesInfo, getGamesInfoQueryKey, useGetGamesSearchQuery } from '@/generated/api';

const catalogRoute = getRouteApi('/(layout)/');

export const useCatalogSearch = () => {
  const searchParams = catalogRoute.useSearch();

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounceValue(searchValue, 500);

  const dropdownDisclosure = useDisclosure();
  const searchRef = useClickOutside<HTMLDivElement>(dropdownDisclosure.close);

  const normalizedDebouncedSearchValue = debouncedSearchValue.trim();

  const getGamesInfoInfiniteQuery = useInfiniteQuery({
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
    getNextPageParam: () => {},
    placeholderData: keepPreviousData
  });

  const getGamesSearchQuery = useGetGamesSearchQuery({
    request: {
      query: {
        search: normalizedDebouncedSearchValue
      }
    },
    params: {
      enabled: !!normalizedDebouncedSearchValue
    }
  });

  const catalogGames = getGamesInfoInfiniteQuery.data?.pages?.[0]?.data.games ?? [];
  const searchedGames = getGamesSearchQuery.data?.data.games ?? [];
  const isSearching = !!normalizedDebouncedSearchValue;
  const isLoading = isSearching
    ? getGamesSearchQuery.isLoading
    : getGamesInfoInfiniteQuery.isLoading;

  const games = isSearching ? searchedGames : catalogGames;

  const isDropdownOpen = dropdownDisclosure.opened;
  const isEmpty =
    isDropdownOpen && isSearching && !isLoading && getGamesSearchQuery.isSuccess && !games.length;

  const onClear = () => setSearchValue('');

  const onSearchValueChange = (value: string) => {
    setSearchValue(value);
    dropdownDisclosure.open();
  };

  const onSearchOpen = () => dropdownDisclosure.open();

  return {
    refs: {
      searchRef
    },
    state: {
      games,
      isDropdownOpen,
      isEmpty,
      isSearching,
      isLoading,
      searchValue
    },
    functions: {
      onClear,
      onSearchClose: dropdownDisclosure.close,
      onSearchOpen,
      onSearchValueChange
    }
  };
};
