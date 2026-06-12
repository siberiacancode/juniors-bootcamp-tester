import { useDebounceValue } from '@siberiacancode/reactuse';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { GameFilter, GameView } from '@/shared/api/generated';

import { useGetGamesInfoQuery, useGetGamesSearchQuery } from '@/shared/api/generated';
import { Button } from '@/shared/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/shared/components/ui/drawer';
import { IconButton } from '@/shared/components/ui/icon-button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupIconButton,
  InputGroupInput
} from '@/shared/components/ui/input-group';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/utils';

import type { CatalogFilters as CatalogFiltersValue } from '../../-helpers/catalog';

import { CATALOG_VIEWS } from '../../-constants/catalog';
import { filterCatalogGames } from '../../-helpers/catalog';
import { CatalogFilters } from './CatalogFilters';
import { GameCard } from './GameCard';

interface CatalogPageProps {
  search: CatalogFiltersValue;
  onResetFilters: () => void;
  onSearchChange: (value: Partial<CatalogFiltersValue>) => void;
}

const CATALOG_SKELETON_KEYS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

const CatalogPage = ({ onResetFilters, onSearchChange, search }: CatalogPageProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFilters, setDrawerFilters] = useState(search);
  const debouncedSearchQuery = useDebounceValue(search.q, 500);

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
      enabled: !debouncedSearchQuery
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
      enabled: Boolean(debouncedSearchQuery)
    }
  });

  const games = debouncedSearchQuery
    ? filterCatalogGames(gamesSearchQuery.data?.data.games ?? [], search)
    : (gamesInfoQuery.data?.data.games ?? []);
  const isLoading =
    search.q !== debouncedSearchQuery ||
    (debouncedSearchQuery ? gamesSearchQuery.isLoading : gamesInfoQuery.isLoading);
  const isError = debouncedSearchQuery
    ? gamesSearchQuery.isError || gamesSearchQuery.data?.data.success === false
    : gamesInfoQuery.isError || gamesInfoQuery.data?.data.success === false;
  const refetchGames = debouncedSearchQuery ? gamesSearchQuery.refetch : gamesInfoQuery.refetch;

  const onTabsValueChange = (value: string) => {
    const nextView = CATALOG_VIEWS.find((view) => view.value === value)?.value;

    if (nextView) {
      onSearchChange({ view: nextView });
    }
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
    <main className='flex flex-col gap-4 lg:gap-5'>
      <div className='flex flex-col gap-2.5 lg:gap-1.5'>
        <label
          className='font-nunito text-[18px]/6.5 font-medium tracking-normal lg:text-[12px]/4'
          htmlFor='catalog-search'
        >
          Поиск
        </label>
        <div className='flex items-center gap-3'>
          <InputGroup className='h-15 flex-1 lg:h-6.5'>
            <InputGroupAddon align='start'>
              <SearchIcon className='text-input lg:size-3.5' />
            </InputGroupAddon>
            <InputGroupInput
              className='text-[24px]/8 placeholder:text-foreground/30 lg:text-[14px]/5'
              id='catalog-search'
              placeholder='Название игры'
              value={search.q}
              onChange={(event) => onSearchChange({ q: event.target.value })}
            />
            {search.q && (
              <InputGroupAddon align='end'>
                <InputGroupIconButton
                  aria-label='Очистить поиск'
                  onClick={() => onSearchChange({ q: '' })}
                >
                  <XIcon />
                </InputGroupIconButton>
              </InputGroupAddon>
            )}
          </InputGroup>

          <Drawer open={isDrawerOpen} onOpenChange={onDrawerOpenChange}>
            <DrawerTrigger asChild>
              <IconButton
                rounded
                aria-label='Открыть фильтры'
                className='size-15 rounded-full bg-secondary text-foreground hover:bg-secondary-hover lg:hidden'
                size='lg'
                variant='secondary'
              >
                <SlidersHorizontalIcon className='size-7' />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent className='max-h-[86dvh] rounded-t-[20px] px-0' showHandle={false}>
              <DrawerHeader className='flex flex-row items-center justify-between px-9 pt-11 pb-5'>
                <DrawerTitle className='text-[32px]/10 font-extrabold tracking-normal'>
                  Фильтры
                </DrawerTitle>
                <DrawerClose asChild>
                  <IconButton
                    rounded
                    aria-label='Закрыть фильтры'
                    className='size-11 text-foreground'
                    variant='ghost'
                  >
                    <XIcon className='size-8' />
                  </IconButton>
                </DrawerClose>
              </DrawerHeader>

              <div className='min-h-0 flex-1 overflow-y-auto px-9 pb-4'>
                <CatalogFilters
                  value={drawerFilters}
                  variant='mobile'
                  onChange={(value) => setDrawerFilters((current) => ({ ...current, ...value }))}
                  onReset={onResetDrawerFilters}
                />
              </div>

              <DrawerFooter className='gap-3 px-9 pt-0 pb-8'>
                <Button
                  className='h-18 text-[18px]/6.5 font-medium'
                  size='lg'
                  variant='secondary'
                  onClick={onResetDrawerFilters}
                >
                  Сбросить фильтры
                </Button>
                <Button
                  className='h-18 text-[20px]/7 font-medium'
                  size='lg'
                  onClick={onApplyDrawerFilters}
                >
                  Найти
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className='grid gap-8 lg:grid-cols-[150px_minmax(0,1fr)] lg:items-start lg:gap-4 xl:grid-cols-[160px_minmax(0,1fr)]'>
        <aside className='hidden lg:block'>
          <CatalogFilters
            showActions
            value={search}
            variant='desktop'
            onChange={onSearchChange}
            onReset={onResetFilters}
          />
        </aside>

        <section className='flex min-w-0 flex-col gap-4'>
          <Tabs value={search.view} onValueChange={onTabsValueChange}>
            <TabsList className='max-w-full scrollbar-none justify-start gap-3 overflow-x-auto overflow-y-hidden bg-transparent p-0 lg:gap-2 [&::-webkit-scrollbar]:hidden'>
              {CATALOG_VIEWS.map((view) => (
                <TabsTrigger
                  key={view.value}
                  className={cn(
                    'h-19 flex-none bg-secondary px-8 text-[26px]/8 font-extrabold tracking-normal text-foreground shadow-none',
                    'data-[state=active]:bg-accent-secondary data-[state=active]:text-accent-secondary-fg data-[state=active]:shadow-none',
                    'lg:h-10 lg:px-6 lg:text-[14px]/5'
                  )}
                  value={view.value}
                >
                  {view.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-5 xl:gap-x-4'>
              {CATALOG_SKELETON_KEYS.map((key) => (
                <div key={key} className='flex flex-col gap-2'>
                  <div className='aspect-460/215 rounded-24 bg-secondary lg:rounded-12' />
                  <div className='h-4 w-28 rounded-full bg-secondary' />
                  <div className='h-4 w-36 rounded-full bg-secondary' />
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className='flex min-h-64 flex-col items-center justify-center gap-4 rounded-24 bg-secondary px-6 text-center'>
              <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
                Не удалось загрузить игры
              </Typography>
              <Button size='lg' type='button' onClick={() => refetchGames()}>
                Повторить
              </Button>
            </div>
          ) : games.length > 0 ? (
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-5 xl:gap-x-4'>
              {games.map((game) => (
                <GameCard key={game.slug} game={game} />
              ))}
            </div>
          ) : (
            <div className='flex min-h-64 items-center justify-center rounded-24 bg-secondary px-6 text-center'>
              <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
                Ничего не найдено
              </Typography>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export { CatalogPage };
