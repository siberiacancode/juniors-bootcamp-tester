import { SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { GameGenre } from '@/shared/api/generated';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/components/ui/input-group';
import { Switch } from '@/shared/components/ui/switch';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/utils';

import { CATALOG_GENRE_LABELS, CATALOG_GENRES } from '../../-constants/catalog';
import { filterGenresByQuery } from '../../-helpers/catalog';

interface FilterValue {
  genre: GameGenre[];
  showDlc: boolean;
  withDiscount: boolean;
}

interface CatalogFiltersProps {
  className?: string;
  showActions?: boolean;
  value: FilterValue;
  variant: 'desktop' | 'mobile';
  onChange: (value: Partial<FilterValue>) => void;
  onReset: () => void;
}

const CatalogFilters = ({
  className,
  onChange,
  onReset,
  showActions = false,
  value,
  variant
}: CatalogFiltersProps) => {
  const [genreQuery, setGenreQuery] = useState('');
  const [showAllGenres, setShowAllGenres] = useState(false);

  const filteredGenres = useMemo(
    () => filterGenresByQuery([...CATALOG_GENRES], CATALOG_GENRE_LABELS, genreQuery),
    [genreQuery]
  );

  const shouldLimitGenres = variant === 'mobile' && !genreQuery && !showAllGenres;
  const visibleGenres = shouldLimitGenres ? filteredGenres.slice(0, 5) : filteredGenres;
  const selectedGenres = new Set(value.genre);

  const onGenreChange = (genre: GameGenre, checked: boolean) => {
    const nextGenres = checked
      ? [...value.genre, genre]
      : value.genre.filter((selectedGenre) => selectedGenre !== genre);

    onChange({ genre: nextGenres });
  };

  return (
    <div className={cn('flex flex-col', variant === 'desktop' ? 'gap-8' : 'gap-7', className)}>
      <div className='flex flex-col gap-5'>
        <label className='flex items-center justify-between gap-4'>
          <Typography
            as='span'
            className='text-[22px]/7 font-medium tracking-normal lg:text-[18px]/6.5'
            variant='body-lg'
          >
            Только со скидкой
          </Typography>
          <Switch
            aria-label='Только со скидкой'
            checked={value.withDiscount}
            onCheckedChange={(checked) => onChange({ withDiscount: checked })}
          />
        </label>

        <label className='flex items-center justify-between gap-4'>
          <Typography
            as='span'
            className='text-[22px]/7 font-medium tracking-normal lg:text-[18px]/6.5'
            variant='body-lg'
          >
            Показывать DLC
          </Typography>
          <Switch
            aria-label='Показывать DLC'
            checked={value.showDlc}
            onCheckedChange={(checked) => onChange({ showDlc: checked })}
          />
        </label>
      </div>

      <div className='flex flex-col gap-4'>
        <Typography
          as='h2'
          className='text-[26px]/8 font-medium tracking-normal lg:text-[22px]/7'
          variant='title-md'
        >
          Жанр
        </Typography>

        <InputGroup className={cn('h-15', variant === 'desktop' && 'h-12')}>
          <InputGroupAddon align='start'>
            <SearchIcon className='text-input' />
          </InputGroupAddon>
          <InputGroupInput
            className='text-[24px]/8 placeholder:text-foreground/30 lg:text-[18px]/6.5'
            placeholder='Название жанра'
            value={genreQuery}
            onChange={(event) => setGenreQuery(event.target.value)}
          />
        </InputGroup>

        <div className='flex flex-col gap-3'>
          {visibleGenres.map((genre) => (
            <label key={genre} className='flex min-h-8 items-center gap-3'>
              <Checkbox
                className={cn(
                  'size-7 rounded-8 border-2 border-ring bg-background',
                  variant === 'desktop' && 'size-5 rounded-6'
                )}
                checked={selectedGenres.has(genre)}
                onCheckedChange={(checked) => onGenreChange(genre, checked === true)}
              />
              <Typography
                as='span'
                className='text-[18px]/6.5 font-medium tracking-normal lg:text-[16px]/6'
                variant='body-md'
              >
                {CATALOG_GENRE_LABELS[genre]}
              </Typography>
            </label>
          ))}
        </div>

        {filteredGenres.length === 0 && (
          <Typography as='p' className='text-foreground/50' variant='body-sm'>
            Жанры не найдены
          </Typography>
        )}

        {shouldLimitGenres && filteredGenres.length > visibleGenres.length && (
          <Button className='self-center px-4 text-[18px]/6.5' variant='ghost' onClick={() => setShowAllGenres(true)}>
            Показать ещё
          </Button>
        )}
      </div>

      {showActions && (
        <div className='mt-auto flex flex-col gap-3 pt-6'>
          <Button className='h-18 text-[18px]/6.5 font-medium' size='lg' variant='secondary' onClick={onReset}>
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
};

export { CatalogFilters };
export type { FilterValue };
