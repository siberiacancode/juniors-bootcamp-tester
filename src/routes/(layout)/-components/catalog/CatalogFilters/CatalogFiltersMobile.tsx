import { ListFilterIcon, SearchIcon, XIcon } from 'lucide-react';

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

import { useCatalogFiltersMobile } from './hooks';

export const CatalogFiltersMobile = () => {
  const { state, functions } = useCatalogFiltersMobile();

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
        <form className='flex flex-col gap-6 px-2' onSubmit={functions.onFiltersApply}>
          <label className='flex items-center justify-between gap-4'>
            <Typography as='span' variant='body-md'>
              <IntlText path='page.catalog.filters.discount' />
            </Typography>
            <Switch
              checked={state.selectedFilters.showedDiscount}
              onCheckedChange={(checked) => functions.onDiscountChange(!!checked)}
            />
          </label>

          <label className='flex items-center justify-between gap-4'>
            <Typography as='span' variant='body-md'>
              <IntlText path='page.catalog.filters.dlc' />
            </Typography>
            <Switch
              checked={state.selectedFilters.showedDlc}
              onCheckedChange={(checked) => functions.onDlcChange(!!checked)}
            />
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
                value={state.genreQuery}
                onChange={(event) => functions.onGenreQueryChange(event.target.value)}
              />
            </InputGroup>

            <div className='max-h-52 overflow-y-auto'>
              <div className='flex flex-col gap-3'>
                {state.visibleGenres.map((genre) => (
                  <label key={genre} className='flex min-h-8 items-center gap-3'>
                    <Checkbox
                      checked={state.selectedFilters.genre.includes(genre)}
                      className='size-5 rounded-6 border-2 border-ring bg-background'
                      onCheckedChange={(checked) => functions.onGenreChange(genre, !!checked)}
                    />
                    <Typography as='span' variant='caption'>
                      <IntlText path={`genre.${genre}`} />
                    </Typography>
                  </label>
                ))}
              </div>
            </div>

            {!state.showedAllGenres &&
              state.filteredGenres.length > state.visibleGenres.length && (
                <Button
                  size='sm'
                  type='button'
                  variant='ghost'
                  onClick={functions.onMoreGenresShow}
                >
                  <IntlText path='button.showMore' />
                </Button>
              )}

            {state.showedAllGenres && (
              <Button
                size='sm'
                type='button'
                variant='ghost'
                onClick={functions.onMoreGenresHide}
              >
                <IntlText path='page.catalog.filters.hide' />
              </Button>
            )}
          </div>
          <DrawerFooter className='gap-2 px-0 py-2'>
            <DrawerClose asChild>
              <Button
                size='lg'
                type='button'
                variant='secondary'
                onClick={functions.onFiltersReset}
              >
                <IntlText path='page.catalog.filters.reset' />
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button size='lg' type='submit'>
                <IntlText path='page.catalog.filters.apply' />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
