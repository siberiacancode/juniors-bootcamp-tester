import { useDisclosure } from '@siberiacancode/reactuse';
import { getRouteApi } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { GameFilter, GameGenre } from '@/generated/api';
import { intl } from '@/utils/lib';

const catalogRoute = getRouteApi('/(layout)/');

export const useCatalogFiltersDesktop = () => {
  const searchParams = catalogRoute.useSearch();
  const navigate = catalogRoute.useNavigate();
  const [genreQuery, setGenreQuery] = useState('');

  const filteredGenres = useMemo(() => {
    const normalizedQuery = genreQuery.trim().toLowerCase();

    return Object.values(GameGenre).filter((genre) =>
      intl
        .formatMessage({
          id: `genre.${genre}`
        })
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [genreQuery]);

  const {
    opened: showedAllGenres,
    open: onMoreGenresShow,
    close: onMoreGenresHide
  } = useDisclosure(false);

  const visibleGenres = showedAllGenres ? filteredGenres : filteredGenres.slice(0, 5);

  const onGenreQueryChange = (value: string) => {
    setGenreQuery(value);
  };

  const onGenreChange = (newGenre: GameGenre, checked: boolean) => {
    const nextGenres = checked
      ? [...searchParams.genre, newGenre]
      : searchParams.genre.filter((genre) => genre !== newGenre);

    navigate({
      search: (currentSearch) => ({
        ...currentSearch,
        genre: nextGenres
      })
    });
  };

  const onDiscountChange = (checked: boolean) => {
    const filter: GameFilter[] = checked
      ? [...searchParams.filter, GameFilter.DISCOUNT]
      : searchParams.filter.filter((filter) => filter !== GameFilter.DISCOUNT);

    navigate({
      search: (currentSearch) => ({
        ...currentSearch,
        filter
      })
    });
  };

  const onDlcChange = (checked: boolean) => {
    const filter: GameFilter[] = checked
      ? [...searchParams.filter, GameFilter.DLC]
      : searchParams.filter.filter((filter) => filter !== GameFilter.DLC);

    navigate({
      search: (currentSearch) => ({
        ...currentSearch,
        filter
      })
    });
  };

  const onFiltersReset = () => {
    setGenreQuery('');
    navigate({
      search: {
        filter: [],
        genre: [],
        view: undefined
      }
    });
  };

  return {
    state: {
      filteredGenres,
      genreQuery,
      searchParams,
      showedAllGenres,
      visibleGenres
    },
    functions: {
      onDiscountChange,
      onDlcChange,
      onFiltersReset,
      onGenreChange,
      onGenreQueryChange,
      onMoreGenresHide,
      onMoreGenresShow
    }
  };
};
