import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Typography
} from '@siberiacancode/uikit';
import { SearchIcon } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { GameFilter } from '@/generated/api';
import { intl, IntlText } from '@/utils/lib';

import { useCatalogFiltersDesktop } from './hooks';

export const CatalogFiltersDesktop = () => {
  const { state, functions } = useCatalogFiltersDesktop();

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-4'>
        <label className='flex items-center justify-between gap-4'>
          <Typography as='span' className='font-normal' variant='body-md'>
            <IntlText path='page.catalog.filters.discount' />
          </Typography>
          <Switch
            checked={state.searchParams.filter.includes(GameFilter.DISCOUNT)}
            onCheckedChange={(checked) => functions.onDiscountChange(!!checked)}
          />
        </label>

        <label className='flex items-center justify-between gap-4'>
          <Typography as='span' className='font-normal' variant='body-md'>
            <IntlText path='page.catalog.filters.dlc' />
          </Typography>
          <Switch
            checked={state.searchParams.filter.includes(GameFilter.DLC)}
            onCheckedChange={(checked) => functions.onDlcChange(!!checked)}
          />
        </label>
      </div>

      <div className='flex flex-col gap-4'>
        <Typography as='p' className='font-normal' variant='body-md'>
          <IntlText path='page.catalog.filters.genre' />
        </Typography>

        <InputGroup>
          <InputGroupAddon align='inline-start'>
            <SearchIcon className='size-4 text-input' />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={intl.formatMessage({ id: 'page.catalog.filters.genrePlaceholder' })}
            value={state.genreQuery}
            onChange={(event) => functions.onGenreQueryChange(event.target.value)}
          />
        </InputGroup>

        <div className='flex flex-col gap-3'>
          {state.visibleGenres.map((genre) => (
            <label key={genre} className='flex min-h-5 items-center gap-2'>
              <Checkbox
                checked={state.searchParams.genre.includes(genre)}
                className='rounded-4 border border-ring bg-background'
                onCheckedChange={(checked) => functions.onGenreChange(genre, !!checked)}
              />
              <Typography as='span' variant='caption'>
                <IntlText path={`genre.${genre}`} />
              </Typography>
            </label>
          ))}
        </div>

        {!state.filteredGenres.length && (
          <Typography as='p' className='text-foreground/50' variant='body-sm'>
            <IntlText path='page.catalog.filters.genreNotFound' />
          </Typography>
        )}

        {state.showedAllGenres && (
          <Button size='sm' variant='ghost' onClick={functions.onMoreGenresHide}>
            <IntlText path='page.catalog.filters.hide' />
          </Button>
        )}

        {!state.showedAllGenres && (
          <Button size='sm' variant='ghost' onClick={functions.onMoreGenresShow}>
            <IntlText path='button.showMore' />
          </Button>
        )}

        <Button size='lg' variant='secondary' onClick={functions.onFiltersReset}>
          <IntlText path='page.catalog.filters.reset' />
        </Button>
      </div>
    </div>
  );
};
