import { useDisclosure } from '@siberiacancode/reactuse';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { intl } from '@/lib';
import { CATALOG_GENRES } from '@/routes/(layout)/-constants';

export const useCatalogFilters = () => {
  const navigate = useNavigate({
    from: '/'
  });

  const [genreQuery, setGenreQuery] = useState('');

  const filteredGenres = useMemo(() => {
    const normalizedQuery = genreQuery.trim().toLowerCase();

    return CATALOG_GENRES.filter((genre) =>
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
    genreQuery,
    setGenreQuery,
    filteredGenres,
    visibleGenres,
    showedAllGenres,
    showMoreGenres,
    hideMoreGenres,
    onResetFilters
  };
};
