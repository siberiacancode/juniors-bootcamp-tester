import { useDebounceValue } from '@siberiacancode/reactuse';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import z from 'zod';

import type { GameFilter, GameView } from '@/shared/api/generated';

import { useGetGamesInfoQuery, useGetGamesSearchQuery } from '@/shared/api/generated';

import type { CatalogFilters } from './-helpers/catalog';

import {
  CatalogFilters as CatalogFiltersAside,
  CatalogFiltersDrawer,
  CatalogGamesGrid,
  CatalogSearch,
  CatalogViewTabs
} from './-components';
import { CATALOG_GENRES, CATALOG_VIEWS } from './-constants/catalog';
import { filterCatalogGames } from './-helpers/catalog';

const CATALOG_VIEW_VALUES = CATALOG_VIEWS.map((view) => view.value);

const DEFAULT_SEARCH = {
  genre: [],
  q: '',
  showDlc: false,
  view: 'all',
  withDiscount: false
} satisfies CatalogFilters;

const catalogSearchSchema = z.object({
  genre: z.array(z.enum(CATALOG_GENRES)).default(DEFAULT_SEARCH.genre).catch(DEFAULT_SEARCH.genre),
  q: z.string().default(DEFAULT_SEARCH.q).catch(DEFAULT_SEARCH.q),
  showDlc: z.boolean().default(DEFAULT_SEARCH.showDlc).catch(DEFAULT_SEARCH.showDlc),
  view: z.enum(CATALOG_VIEW_VALUES).default(DEFAULT_SEARCH.view).catch(DEFAULT_SEARCH.view),
  withDiscount: z.boolean().default(DEFAULT_SEARCH.withDiscount).catch(DEFAULT_SEARCH.withDiscount)
});

export const Route = createFileRoute('/(layout)/')({
  component: RouteComponent,
  validateSearch: catalogSearchSchema,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)]
  }
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFilters, setDrawerFilters] = useState(search);
  const debouncedSearchQuery = useDebounceValue(search.q, 500);
  const shouldUseSearchQuery = Boolean(debouncedSearchQuery) && search.view === 'all';

  const gameFilters = useMemo(() => {
    const filters: GameFilter[] = [];

    if (search.withDiscount) {
      filters.push('discount');
    }

    if (search.showDlc) {
      filters.push('dlc');
    }

    return filters;
  }, [search.showDlc, search.withDiscount]);

  const gamesInfoQuery = useGetGamesInfoQuery({
    request: {
      query: {
        filter: gameFilters.length > 0 ? gameFilters : undefined,
        genre: search.genre.length > 0 ? search.genre : undefined,
        limit: 60,
        page: 1,
        view: search.view === 'all' ? undefined : (search.view satisfies GameView)
      }
    },
    params: {
      enabled: !shouldUseSearchQuery
    }
  });

  const gamesSearchQuery = useGetGamesSearchQuery({
    request: {
      query: {
        limit: 60,
        search: debouncedSearchQuery
      }
    },
    params: {
      enabled: shouldUseSearchQuery
    }
  });

  const sourceGames = shouldUseSearchQuery
    ? (gamesSearchQuery.data?.data.games ?? [])
    : (gamesInfoQuery.data?.data.games ?? []);
  const games = filterCatalogGames(sourceGames, search);
  const isLoading =
    search.q !== debouncedSearchQuery ||
    (shouldUseSearchQuery ? gamesSearchQuery.isLoading : gamesInfoQuery.isLoading);
  const isError = shouldUseSearchQuery
    ? gamesSearchQuery.isError || gamesSearchQuery.data?.data.success === false
    : gamesInfoQuery.isError || gamesInfoQuery.data?.data.success === false;

  const onSearchChange = (value: Partial<CatalogFilters>) => {
    navigate({
      search: (current) => ({
        ...current,
        ...value
      })
    });
  };

  const onResetFilters = () => {
    navigate({
      search: (current) => ({
        ...DEFAULT_SEARCH,
        q: current.q,
        view: current.view
      })
    });
  };

  const onDrawerOpenChange = (open: boolean) => {
    if (open) {
      setDrawerFilters(search);
    }

    setIsDrawerOpen(open);
  };

  const onApplyDrawerFilters = () => {
    onSearchChange(drawerFilters);
    setIsDrawerOpen(false);
  };

  const onResetDrawerFilters = () => {
    setDrawerFilters({
      genre: [],
      q: search.q,
      showDlc: false,
      view: search.view,
      withDiscount: false
    });
  };

  return (
    <main className='flex flex-col gap-4 sm:pt-10 sm:pb-28 lg:gap-5'>
      <div className='flex items-end gap-3'>
        <CatalogSearch value={search.q} onChange={(q) => onSearchChange({ q })} />
        <CatalogFiltersDrawer
          open={isDrawerOpen}
          value={drawerFilters}
          onApply={onApplyDrawerFilters}
          onChange={(value) => setDrawerFilters((current) => ({ ...current, ...value }))}
          onOpenChange={onDrawerOpenChange}
          onReset={onResetDrawerFilters}
        />
      </div>

      <div className='grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start lg:gap-4 xl:grid-cols-[160px_minmax(0,1fr)]'>
        <aside className='hidden lg:block'>
          <CatalogFiltersAside
            showActions
            value={search}
            variant='desktop'
            onChange={onSearchChange}
            onReset={onResetFilters}
          />
        </aside>

        <section className='flex min-w-0 flex-col gap-4'>
          <CatalogViewTabs value={search.view} onChange={(view) => onSearchChange({ view })} />
          <CatalogGamesGrid games={games} isError={isError} isLoading={isLoading} />
        </section>
      </div>
    </main>
  );
}
