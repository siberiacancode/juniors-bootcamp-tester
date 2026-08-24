import { useClickOutside, useDebounceValue, useDisclosure } from '@siberiacancode/reactuse';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useRef, useState } from 'react';

import type { GameSearchResponse, GamesPaginatedResponse } from '@/generated/api';

import { getGamesInfo, getGamesInfoQueryKey, useGetGamesSearchQuery } from '@/generated/api';

import { CATALOG_GAMES_LIMIT } from '../../../../-constants';

const catalogRoute = getRouteApi('/(layout)/');

export const useCatalogSearch = () => {
  const searchParams = catalogRoute.useSearch();
  const comboboxAnchorRef = useRef<HTMLDivElement>(null);
  const blockOpenUntilRef = useRef(0);

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
          limit: CATALOG_GAMES_LIMIT,
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

  const catalogGamesData = getGamesInfoInfiniteQuery.data?.pages?.[0]
    ?.data as GamesPaginatedResponse;
  const searchedGamesData = getGamesSearchQuery.data?.data as GameSearchResponse;
  const catalogGames = catalogGamesData.games;
  const searchedGames = searchedGamesData?.games ?? [];
  const isSearching = !!normalizedDebouncedSearchValue;
  const isLoading = isSearching
    ? getGamesSearchQuery.isLoading
    : getGamesInfoInfiniteQuery.isLoading;

  const games = isSearching ? searchedGames : catalogGames;

  const isDropdownOpen = dropdownDisclosure.opened;
  const isEmpty =
    isDropdownOpen && isSearching && !isLoading && getGamesSearchQuery.isSuccess && !games.length;

  const onSearchClose = () => {
    blockOpenUntilRef.current = Date.now() + 150;
    dropdownDisclosure.close();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const onClear = () => {
    setSearchValue('');
    onSearchClose();
  };

  const onSearchValueChange = (value: string) => {
    setSearchValue(value);

    if (Date.now() < blockOpenUntilRef.current) return;

    dropdownDisclosure.open();
  };

  const onSearchOpen = () => {
    if (Date.now() < blockOpenUntilRef.current) return;

    dropdownDisclosure.open();
  };

  return {
    refs: {
      searchRef,
      comboboxAnchorRef
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
      onSearchClose,
      onSearchOpen,
      onSearchValueChange
    }
  };
};
