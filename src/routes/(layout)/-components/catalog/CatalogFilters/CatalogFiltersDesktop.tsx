import { useNavigate, useSearch } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';

import type { GameFilter, GameGenre } from '@/generated/api';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Switch } from '@/components/ui/switch';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import { useCatalogFilters } from './useCatalogFilters';

export const CatalogFiltersDesktop = () => {
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
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-3'>
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
            checked={searchParams.filter.includes('discount')}
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
            checked={searchParams.filter.includes('dlc')}
            onCheckedChange={onToggleDlc}
          />
        </label>
      </div>

      <div className={cn('flex flex-col gap-3')}>
        <Typography
          as='h2'
          className='text-[26px]/8 font-medium tracking-normal lg:text-[13px]/4.5'
          variant='title-md'
        >
          Жанр
        </Typography>

        <InputGroup className='h-7'>
          <InputGroupAddon align='start'>
            <SearchIcon className={'size-3.5 text-input'} />
          </InputGroupAddon>
          <InputGroupInput
            className='text-[24px]/8 placeholder:text-foreground/30 lg:text-[13px]/4.5'
            placeholder='Название жанра'
            value={genreQuery}
            onChange={(event) => setGenreQuery(event.target.value)}
          />
        </InputGroup>

        <div className={'flex flex-col gap-2'}>
          {visibleGenres.map((genre) => (
            <label key={genre} className='flex min-h-5 items-center gap-2'>
              <Checkbox
                checked={searchParams.genre.includes(genre)}
                className='rounded-4 border border-ring bg-background'
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

        <Button size='lg' variant='secondary' onClick={onResetFilters}>
          Сбросить фильтры
        </Button>
      </div>
    </div>
  );
};
