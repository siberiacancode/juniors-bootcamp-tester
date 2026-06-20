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
import { intl, IntlText } from '@/lib';

import { useCatalogFilters } from './useCatalogFilters';

export const CatalogFiltersMobile = () => {
  const {
    functions: { hideMoreGenres, navigate, showMoreGenres, onResetFilters, setGenreQuery },
    state: { filteredGenres, genreQuery, searchParams, showedAllGenres, visibleGenres }
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
    <Drawer direction='bottom' shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <IconButton rounded className='lg:hidden' variant='secondary'>
          <ListFilterIcon />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent className='p-4' showHandle={false}>
        <DrawerHeader className='flex flex-row justify-between px-2 py-3'>
          <DrawerTitle asChild>
            <Typography as='h2' variant='title-md'>
              <IntlText path='page.catalog.filters.title' />
            </Typography>
          </DrawerTitle>
          <DrawerClose asChild>
            <IconButton className='size-6' type='button' variant='ghost'>
              <XIcon className='size-6' />
            </IconButton>
          </DrawerClose>
        </DrawerHeader>
        <div className='flex flex-col gap-6 px-2'>
          <label className='flex items-center justify-between gap-4'>
            <Typography as='span' variant='body-md'>
              <IntlText path='page.catalog.filters.discount' />
            </Typography>
            <Switch checked={selectedFilters.showedDiscount} onCheckedChange={onToggleDiscount} />
          </label>

          <label className='flex items-center justify-between gap-4'>
            <Typography as='span' variant='body-md'>
              <IntlText path='page.catalog.filters.dlc' />
            </Typography>
            <Switch checked={selectedFilters.showedDlc} onCheckedChange={onToggleDlc} />
          </label>

          <div className='mb-6 flex flex-col gap-4'>
            <Typography as='span' variant='body-md'>
              <IntlText path='page.catalog.filters.genre' />
            </Typography>

            <InputGroup className='h-10'>
              <InputGroupAddon align='start'>
                <SearchIcon className='text-input' />
              </InputGroupAddon>
              <InputGroupInput
                placeholder={intl.formatMessage({ id: 'page.catalog.filters.genrePlaceholder' })}
                value={genreQuery}
                onChange={(event) => setGenreQuery(event.target.value)}
              />
            </InputGroup>

            <div className='max-h-52 overflow-y-auto'>
              <div className='flex flex-col gap-3'>
                {visibleGenres.map((genre) => (
                  <label key={genre} className='flex min-h-8 items-center gap-3'>
                    <Checkbox
                      checked={selectedFilters.genre.includes(genre)}
                      className='size-5 rounded-6 border-2 border-ring bg-background'
                      onCheckedChange={(checked) => onGenreChange(genre, checked as boolean)}
                    />
                    <Typography as='span' variant='caption'>
                      <IntlText path={`genre.${genre}`} />
                    </Typography>
                  </label>
                ))}
              </div>
            </div>

            {!showedAllGenres && filteredGenres.length > visibleGenres.length && (
              <Button size='sm' variant='ghost' onClick={showMoreGenres}>
                <IntlText path='button.showMore' />
              </Button>
            )}

            {showedAllGenres && (
              <Button size='sm' variant='ghost' onClick={hideMoreGenres}>
                <IntlText path='page.catalog.filters.hide' />
              </Button>
            )}
          </div>
        </div>
        <DrawerFooter className='gap-2 px-0 py-2'>
          <DrawerClose asChild>
            <Button size='lg' variant='secondary' onClick={onResetFilters}>
              <IntlText path='page.catalog.filters.reset' />
            </Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button size='lg' onClick={onApplyFilters}>
              <IntlText path='page.catalog.filters.apply' />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
