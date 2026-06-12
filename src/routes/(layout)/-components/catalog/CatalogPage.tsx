import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

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

import { CATALOG_VIEWS, catalogGames } from '../../-constants/catalog';
import { filterCatalogGames } from '../../-helpers/catalog';
import { CatalogFilters } from './CatalogFilters';
import { GameCard } from './GameCard';

interface CatalogPageProps {
  search: CatalogFiltersValue;
  onResetFilters: () => void;
  onSearchChange: (value: Partial<CatalogFiltersValue>) => void;
}

const CatalogPage = ({ onResetFilters, onSearchChange, search }: CatalogPageProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFilters, setDrawerFilters] = useState(search);

  const filteredGames = useMemo(
    () => filterCatalogGames(catalogGames, search),
    [search.genre, search.q, search.showDlc, search.view, search.withDiscount]
  );

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
    <main className='flex flex-col gap-8 lg:gap-10'>
      <div className='flex flex-col gap-7 lg:gap-10'>
        <Typography
          as='h1'
          className='text-[34px]/10 font-extrabold tracking-normal lg:text-[48px]/12'
          variant='title-lg'
        >
          Магазин игр
        </Typography>

        <div className='grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start xl:grid-cols-[280px_minmax(0,1fr)]'>
          <aside className='hidden lg:block'>
            <CatalogFilters
              showActions
              value={search}
              variant='desktop'
              onChange={onSearchChange}
              onReset={onResetFilters}
            />
          </aside>

          <section className='flex min-w-0 flex-col gap-8'>
            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-2.5'>
                <label
                  className='font-nunito text-[18px]/6.5 font-medium tracking-normal lg:text-[16px]/6'
                  htmlFor='catalog-search'
                >
                  Поиск
                </label>
                <div className='flex items-center gap-3'>
                  <InputGroup className='h-15 flex-1 lg:h-13'>
                    <InputGroupAddon align='start'>
                      <SearchIcon className='text-input' />
                    </InputGroupAddon>
                    <InputGroupInput
                      className='text-[24px]/8 placeholder:text-foreground/30 lg:text-[20px]/7'
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
                    <DrawerContent
                      className='max-h-[86dvh] rounded-t-[20px] px-0'
                      showHandle={false}
                    >
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
                          onChange={(value) =>
                            setDrawerFilters((current) => ({ ...current, ...value }))
                          }
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

              <Tabs value={search.view} onValueChange={onTabsValueChange}>
                <TabsList className='max-w-full scrollbar-none justify-start gap-3 overflow-x-auto overflow-y-hidden bg-transparent p-0 [&::-webkit-scrollbar]:hidden'>
                  {CATALOG_VIEWS.map((view) => (
                    <TabsTrigger
                      key={view.value}
                      className={cn(
                        'h-19 flex-none bg-secondary px-8 text-[26px]/8 font-extrabold tracking-normal text-foreground shadow-none',
                        'data-[state=active]:bg-accent-secondary data-[state=active]:text-accent-secondary-fg data-[state=active]:shadow-none',
                        'lg:h-13 lg:px-8 lg:text-[20px]/7'
                      )}
                      value={view.value}
                    >
                      {view.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {filteredGames.length > 0 ? (
              <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-9 xl:gap-x-6'>
                {filteredGames.map((game) => (
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
      </div>
    </main>
  );
};

export { CatalogPage };
