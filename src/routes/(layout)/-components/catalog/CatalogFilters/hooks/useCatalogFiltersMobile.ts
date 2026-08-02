import { useDisclosure } from '@siberiacancode/reactuse';
import { getRouteApi } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { GameFilter, GameGenre } from '@/generated/api';

import { GENRES } from '@/helpers/constants';
import { intl } from '@/lib';

interface CatalogFiltersMobileFormValues {
  genre: GameGenre[];
  showedDiscount: boolean;
  showedDlc: boolean;
}

const catalogRoute = getRouteApi('/(layout)/');

export const useCatalogFiltersMobile = () => {
  const searchParams = catalogRoute.useSearch();
  const navigate = catalogRoute.useNavigate();
  const [genreQuery, setGenreQuery] = useState('');

  const form = useForm<CatalogFiltersMobileFormValues>({
    values: {
      genre: searchParams.genre,
      showedDlc: searchParams.filter.includes('dlc'),
      showedDiscount: searchParams.filter.includes('discount')
    }
  });

  const filteredGenres = useMemo(() => {
    const normalizedQuery = genreQuery.trim().toLowerCase();

    return GENRES.filter((genre) =>
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

  const selectedFilters = form.watch();
  const visibleGenres = showedAllGenres ? filteredGenres : filteredGenres.slice(0, 5);

  const onGenreQueryChange = (value: string) => {
    setGenreQuery(value);
  };

  const onGenreChange = (newGenre: GameGenre, checked: boolean) => {
    const currentGenres = form.getValues('genre');
    const nextGenres = checked
      ? [...currentGenres, newGenre]
      : currentGenres.filter((genre) => genre !== newGenre);

    form.setValue('genre', nextGenres);
  };

  const onDiscountChange = (checked: boolean) => {
    form.setValue('showedDiscount', checked);
  };

  const onDlcChange = (checked: boolean) => {
    form.setValue('showedDlc', checked);
  };

  const onFiltersApply = form.handleSubmit((values) => {
    const filter: GameFilter[] = [
      ...(values.showedDlc ? ['dlc' as const] : []),
      ...(values.showedDiscount ? ['discount' as const] : [])
    ];

    navigate({
      search: (currentSearch) => ({
        ...currentSearch,
        filter,
        genre: values.genre
      })
    });
  });

  const onFiltersReset = () => {
    setGenreQuery('');
    form.reset({
      genre: [],
      showedDlc: false,
      showedDiscount: false
    });
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
      selectedFilters,
      showedAllGenres,
      visibleGenres
    },
    functions: {
      onDiscountChange,
      onDlcChange,
      onFiltersApply,
      onFiltersReset,
      onGenreChange,
      onGenreQueryChange,
      onMoreGenresHide,
      onMoreGenresShow
    }
  };
};
