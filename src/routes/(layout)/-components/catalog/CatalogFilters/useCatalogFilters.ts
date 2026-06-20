import { useDisclosure } from '@siberiacancode/reactuse';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { GENRES } from '@/helpers/constants';
import { intl } from '@/lib';

export const useCatalogFilters = () => {
  const searchParams = useSearch({
    from: '/(layout)/'
  });

  const navigate = useNavigate({
    from: '/'
  });

  const [genreQuery, setGenreQuery] = useState('');

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
    open: showMoreGenres,
    close: hideMoreGenres
  } = useDisclosure(false);

  const visibleGenres = showedAllGenres ? filteredGenres : filteredGenres.slice(0, 5);

  const onResetFilters = () => {
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
      genreQuery,
      filteredGenres,
      visibleGenres,
      showedAllGenres,
      searchParams
    },
    functions: {
      setGenreQuery,
      showMoreGenres,
      hideMoreGenres,
      onResetFilters,
      navigate
    }
  };
};
