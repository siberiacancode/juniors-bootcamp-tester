import { SearchIcon } from 'lucide-react';

import type { GameFilter, GameGenre } from '@/generated/api';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { Typography } from '@/components/ui/typography';
import { intl, IntlText } from '@/lib';

import { useCatalogFilters } from './useCatalogFilters';

export const CatalogFiltersDesktop = () => {
  const {
    functions: { hideMoreGenres, navigate, showMoreGenres, onResetFilters, setGenreQuery },
    state: { filteredGenres, genreQuery, searchParams, showedAllGenres, visibleGenres }
  } = useCatalogFilters();

  const onGenreChange = (newGenre: GameGenre, checked: boolean) => {
    const nextGenres = checked
      ? [...searchParams.genre, newGenre]
      : searchParams.genre.filter((genre) => genre !== newGenre);

    navigate({
      search: (s) => ({
        ...s,
        genre: nextGenres
      })
    });
  };

  const onToggleDiscount = (checked: boolean) => {
    const filter: GameFilter[] = checked
      ? [...searchParams.filter, 'discount']
      : searchParams.filter.filter((f) => f !== 'discount');

    navigate({
      search: (s) => ({
        ...s,
        filter
      })
    });
  };

  const onToggleDlc = (checked: boolean) => {
    const filter: GameFilter[] = checked
      ? [...searchParams.filter, 'dlc']
      : searchParams.filter.filter((f) => f !== 'dlc');

    navigate({
      search: (s) => ({
        ...s,
        filter
      })
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <label className='flex items-center justify-between gap-4'>
          <Typography as='span' className='font-normal' variant='body-md'>
            <IntlText path='page.catalog.filters.discount' />
          </Typography>
          <Switch
            checked={searchParams.filter.includes('discount')}
            onCheckedChange={onToggleDiscount}
          />
        </label>

        <label className='flex items-center justify-between gap-4'>
          <Typography as='span' className='font-normal' variant='body-md'>
            <IntlText path='page.catalog.filters.dlc' />
          </Typography>
          <Switch checked={searchParams.filter.includes('dlc')} onCheckedChange={onToggleDlc} />
        </label>
      </div>

      <div className='flex flex-col gap-4'>
        <Typography as='p' className='font-normal' variant='body-md'>
          <IntlText path='page.catalog.filters.genre' />
        </Typography>

        <InputGroup>
          <InputGroupAddon align='start'>
            <SearchIcon className='size-4 text-input' />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={intl.formatMessage({ id: 'page.catalog.filters.genrePlaceholder' })}
            value={genreQuery}
            onChange={(event) => setGenreQuery(event.target.value)}
          />
        </InputGroup>

        <div className='flex flex-col gap-3'>
          {visibleGenres.map((genre) => (
            <label key={genre} className='flex min-h-5 items-center gap-2'>
              <Checkbox
                checked={searchParams.genre.includes(genre)}
                className='rounded-4 border border-ring bg-background'
                onCheckedChange={(checked) => onGenreChange(genre, checked as boolean)}
              />
              <Typography as='span' variant='caption'>
                <IntlText path={`genre.${genre}`} />
              </Typography>
            </label>
          ))}
        </div>

        {filteredGenres.length === 0 && (
          <Typography as='p' className='text-foreground/50' variant='body-sm'>
            <IntlText path='page.catalog.filters.genreNotFound' />
          </Typography>
        )}

        {showedAllGenres && (
          <Button size='sm' variant='ghost' onClick={hideMoreGenres}>
            <IntlText path='page.catalog.filters.hide' />
          </Button>
        )}

        {!showedAllGenres && (
          <Button size='sm' variant='ghost' onClick={showMoreGenres}>
            <IntlText path='button.showMore' />
          </Button>
        )}

        <Button size='lg' variant='secondary' onClick={onResetFilters}>
          <IntlText path='page.catalog.filters.reset' />
        </Button>
      </div>
    </div>
  );
};
