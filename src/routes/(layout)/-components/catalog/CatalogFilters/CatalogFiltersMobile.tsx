import { useNavigate, useSearch } from '@tanstack/react-router';
import { ListFilterIcon, SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import type { GameFilter, GameGenre } from '@/generated/api';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { IconButton } from '@/components/ui/icon-button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib';

import { useCatalogFilters } from './useCatalogFilters';

export const CatalogFiltersMobile = () => {
  const searchParams = useSearch({
    from: '/(layout)/'
  });

  const navigate = useNavigate({
    from: '/'
  });

  const {
    genreQuery,
    setGenreQuery,
    filteredGenres,
    visibleGenres,
    showedAllGenres,
    showMoreGenres,
    hideMoreGenres,
    onResetFilters
  } = useCatalogFilters();

  const [selectedFilters, setSelectedFilters] = useState({
    genre: searchParams.genre,
    showedDlc: searchParams.filter.includes('dlc'),
    showedDiscount: searchParams.filter.includes('discount')
  });

  const onGenreChange = (newGenre: GameGenre, checked: boolean) => {
    const nextGenres = checked
      ? [...selectedFilters.genre, newGenre]
      : selectedFilters.genre.filter((genre) => genre !== newGenre);

    setSelectedFilters((s) => ({
      ...s,
      genre: nextGenres
    }));
  };

  const onToggleDiscount = (checked: boolean) => {
    setSelectedFilters((s) => ({
      ...s,
      showedDiscount: checked
    }));
  };

  const onToggleDlc = (checked: boolean) => {
    setSelectedFilters((s) => ({
      ...s,
      showedDlc: checked
    }));
  };

  const onApplyFilters = () => {
    const filter: GameFilter[] = [
      ...(selectedFilters.showedDlc ? ['dlc' as const] : []),
      ...(selectedFilters.showedDiscount ? ['discount' as const] : [])
    ];

    navigate({
      search: (s) => ({
        ...s,
        filter,
        genre: selectedFilters.genre
      })
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IconButton
          rounded
          aria-label='Открыть фильтры'
          className='size-15 rounded-full bg-secondary text-foreground hover:bg-secondary-hover lg:hidden'
          size='lg'
          variant='secondary'
        >
          <ListFilterIcon className='size-7' />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent className='max-h-[86dvh] rounded-t-20 px-0' showHandle={false}>
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
          <div className='flex flex-col gap-7'>
            <div className='flex flex-col gap-5'>
              <label className='flex items-center justify-between gap-4'>
                <Typography
                  as='span'
                  className='text-[22px]/7 font-medium tracking-normal lg:text-[13px]/4.5'
                  variant='body-lg'
                >
                  Только со скидкой
                </Typography>
                <Switch
                  aria-label='Только со скидкой'
                  checked={selectedFilters.showedDiscount}
                  onCheckedChange={onToggleDiscount}
                />
              </label>

              <label className='flex items-center justify-between gap-4'>
                <Typography
                  as='span'
                  className='text-[22px]/7 font-medium tracking-normal lg:text-[13px]/4.5'
                  variant='body-lg'
                >
                  Показывать DLC
                </Typography>
                <Switch
                  aria-label='Показывать DLC'
                  checked={selectedFilters.showedDlc}
                  onCheckedChange={onToggleDlc}
                />
              </label>
            </div>

            <div className='flex flex-col gap-4'>
              <Typography
                as='h2'
                className='text-[26px]/8 font-medium tracking-normal lg:text-[13px]/4.5'
                variant='title-md'
              >
                Жанр
              </Typography>

              <InputGroup className='h-15'>
                <InputGroupAddon align='start'>
                  <SearchIcon className='text-input' />
                </InputGroupAddon>
                <InputGroupInput
                  className='text-[24px]/8 placeholder:text-foreground/30 lg:text-[13px]/4.5'
                  placeholder='Название жанра'
                  value={genreQuery}
                  onChange={(event) => setGenreQuery(event.target.value)}
                />
              </InputGroup>

              <div className='flex flex-col gap-3'>
                {visibleGenres.map((genre) => (
                  <label key={genre} className='flex min-h-8 items-center gap-3'>
                    <Checkbox
                      checked={selectedFilters.genre.includes(genre)}
                      className='size-7 rounded-4 border-2 border-ring bg-background'
                      onCheckedChange={(checked) => onGenreChange(genre, checked as boolean)}
                    />
                    <Typography
                      as='span'
                      className='text-[18px]/6.5 font-medium tracking-normal lg:text-[11px]/4'
                      variant='body-md'
                    >
                      <IntlText path={`genre.${genre}`} />
                    </Typography>
                  </label>
                ))}
              </div>

              {filteredGenres.length === 0 && (
                <Typography as='p' className='text-foreground/50' variant='body-sm'>
                  Жанры не найдены
                </Typography>
              )}

              {showedAllGenres && (
                <Button size='sm' variant='ghost' onClick={hideMoreGenres}>
                  Cкрыть
                </Button>
              )}

              {!showedAllGenres && (
                <Button size='sm' variant='ghost' onClick={showMoreGenres}>
                  Показать ещё
                </Button>
              )}
            </div>
          </div>
        </div>

        <DrawerFooter className='gap-3 px-9 pt-0 pb-8'>
          <DrawerClose asChild>
            <Button size='lg' variant='secondary' onClick={onResetFilters}>
              Сбросить фильтры
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button className='h-18 text-[20px]/7 font-medium' size='lg' onClick={onApplyFilters}>
              Найти
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
