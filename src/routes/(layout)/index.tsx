import { useInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import { Loader2Icon, LoaderIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import z from 'zod';

import { Button } from '@/components/ui/button';
import { ChipGroup, ChipGroupItem } from '@/components/ui/chip-group';
import { Typography } from '@/components/ui/typography';
import { getGamesInfo, getGamesInfoQueryKey } from '@/generated/api';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import { CatalogSearch } from './-components';
import { CatalogSaleBanner, CatalogSkeleton } from './-components/catalog';
import { CatalogFiltersDesktop, CatalogFiltersMobile } from './-components/catalog/CatalogFilters';
import { GameCard } from './-components/catalog/GameCard';
import {
  ALL_CATALOG_VIEWS,
  CATALOG_FILTERS,
  CATALOG_GENRES,
  CATALOG_VIEWS
} from './-constants/catalog';

const catalogSearchSchema = z.object({
  genre: z.array(z.enum(CATALOG_GENRES)).default([]),
  filter: z.array(z.enum(CATALOG_FILTERS)).default([]),
  view: z.enum(CATALOG_VIEWS).optional().catch(undefined)
});

type CatalogSearchParams = z.infer<typeof catalogSearchSchema>;

const DEFAULT_SEARCH: CatalogSearchParams = {
  genre: [],
  filter: [],
  view: undefined
};

export const Route = createFileRoute('/(layout)/')({
  component: CatalogPage,
  validateSearch: catalogSearchSchema,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)]
  }
});

function CatalogPage() {
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();

  const gamesInfoQuery = useInfiniteQuery({
    queryKey: [getGamesInfoQueryKey, searchParams],
    queryFn: ({ pageParam }) =>
      getGamesInfo({
        query: {
          page: pageParam,
          ...searchParams
        }
      }),
    initialPageParam: 1,
    getNextPageParam: ({ data }) =>
      data.meta.page < data.meta.totalPages ? data.meta.page + 1 : null
  });

  const onViewChange = (view: '' | (typeof ALL_CATALOG_VIEWS)[number]) => {
    if (view === '') return;
    navigate({
      search: (s) => ({
        ...s,
        view: view === 'all' ? undefined : view
      })
    });
  };

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='flex flex-col gap-6 sm:pt-10 sm:pb-28'>
      <Typography as='h1' className='lg:hidden' variant='title-md'>
        <IntlText path='page.catalog.title' />
      </Typography>

      <div className='flex items-end gap-2'>
        <CatalogSearch searchValue={searchValue} onSearchValueChange={setSearchValue} />
        {!(searchValue.trim().length > 0) && <CatalogFiltersMobile />}
      </div>

      <ChipGroup
        className='max-w-full scrollbar-none justify-start gap-2 overflow-x-auto overflow-y-hidden bg-transparent p-0 [&::-webkit-scrollbar]:hidden'
        type='single'
        value={searchParams.view ?? 'all'}
        onValueChange={onViewChange}
      >
        {ALL_CATALOG_VIEWS.map((view) => (
          <ChipGroupItem
            key={view}
            className={cn(
              'h-13 flex-none bg-secondary px-8 text-[20px]/7 font-bold tracking-wide text-foreground shadow-none',
              'data-[state=on]:bg-accent-secondary data-[state=on]:text-accent-secondary-fg data-[state=on]:shadow-none',
              view === 'all' && 'px-4.5'
            )}
            icon={false}
            value={view}
          >
            <IntlText path={`page.catalog.views.${view}`} />
          </ChipGroupItem>
        ))}
      </ChipGroup>

      <div className='grid gap-10 lg:grid-cols-[264px_minmax(0,1fr)] lg:items-start lg:gap-4'>
        <aside className='hidden flex-col gap-6 lg:flex'>
          <CatalogFiltersDesktop />
          <CatalogSaleBanner />
        </aside>

        <section className='flex min-w-0 flex-col gap-6 lg:gap-4'>
          {gamesInfoQuery.isFetching && !gamesInfoQuery.isLoading && (
            <div className='grid w-full place-items-center self-stretch py-4'>
              <Loader2Icon className='size-8 animate-spin' />
            </div>
          )}

          {gamesInfoQuery.isLoading && (
            <>
              <CatalogSkeleton />
              <CatalogSaleBanner className='lg:hidden' />
            </>
          )}

          {!gamesInfoQuery.isLoading && gamesInfoQuery.isError && (
            <div className='flex min-h-64 flex-col items-center justify-center gap-4 rounded-24 bg-secondary px-6 text-center'>
              <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
                <IntlText path='page.catalog.games.error' />
              </Typography>
            </div>
          )}

          {!gamesInfoQuery.isLoading && !gamesInfoQuery.isError && (
            <>
              <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6'>
                {gamesInfoQuery.data?.pages.map((group, i) => (
                  <Fragment key={i}>
                    {group.data.games.map((game) => (
                      <GameCard key={game.slug} game={game} />
                    ))}
                  </Fragment>
                ))}
              </div>

              {gamesInfoQuery.data?.pages.flatMap((group) => group.data.games).length === 0 && (
                <div className='flex min-h-64 items-center justify-center rounded-24 bg-secondary px-6 text-center'>
                  <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
                    <IntlText path='page.catalog.games.nothingFound' />
                  </Typography>
                </div>
              )}

              <div className='flex justify-center'>
                {gamesInfoQuery.hasNextPage && (
                  <Button
                    className='h-13 w-full lg:w-78.5'
                    disabled={gamesInfoQuery.isFetching}
                    onClick={() => gamesInfoQuery.fetchNextPage()}
                  >
                    {gamesInfoQuery.isFetchingNextPage && <LoaderIcon className='animate-spin' />}
                    <IntlText path='button.showMore' />
                  </Button>
                )}
              </div>

              <CatalogSaleBanner className='lg:hidden' />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
