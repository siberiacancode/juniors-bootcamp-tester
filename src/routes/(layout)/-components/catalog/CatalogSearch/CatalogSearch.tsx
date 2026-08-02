import { Link } from '@tanstack/react-router';
import { LoaderCircleIcon, SearchIcon, SearchXIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';

import type { GameFiltered } from '@/generated/api';

import { Badge } from '@/components/ui/badge';
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox';
import { InputGroupAddon, InputGroupIconButton } from '@/components/ui/input-group';
import { Typography } from '@/components/ui/typography';
import { formatDiscountPercent, formatMoney, getAsset } from '@/helpers/utils';
import { intl, IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import { useCatalogSearch } from './hooks';

export const CatalogSearch = () => {
  const { refs, state, functions } = useCatalogSearch();
  const comboboxAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {state.isDropdownOpen && (
        <div className='fixed inset-0 z-[60] bg-foreground/40' onClick={functions.onSearchClose} />
      )}

      <div
        ref={refs.searchRef}
        className={cn('relative flex min-w-0 flex-1 flex-col', state.isDropdownOpen && 'z-[70]')}
      >
        <Combobox
          filter={null}
          items={state.games}
          open={state.isDropdownOpen}
          openOnInputClick={false}
        >
          <ComboboxInput
            aria-label={intl.formatMessage({ id: 'page.catalog.search.label' })}
            className='w-full bg-background'
            inputGroupRef={comboboxAnchorRef}
            placeholder={intl.formatMessage({ id: 'page.catalog.search.placeholder' })}
            showTrigger={false}
            value={state.searchValue}
            onClick={functions.onSearchOpen}
            onChange={(event) => functions.onSearchValueChange(event.target.value)}
            onFocus={functions.onSearchOpen}
          >
            <InputGroupAddon align='start'>
              <SearchIcon />
            </InputGroupAddon>
            {!!state.searchValue && (
              <InputGroupAddon align='end'>
                <InputGroupIconButton onClick={functions.onClear}>
                  <XIcon />
                </InputGroupIconButton>
              </InputGroupAddon>
            )}
          </ComboboxInput>
          <ComboboxContent anchor={comboboxAnchorRef} className='p-0'>
            {state.isLoading && (
              <div className='flex min-h-42 flex-col items-center justify-center gap-4 p-4 text-[#969696]'>
                <LoaderCircleIcon className='size-10 animate-spin' />
                <Typography as='p' className='text-center' variant='body-lg'>
                  <IntlText path='page.catalog.search.loading' />
                </Typography>
              </div>
            )}

            {state.isEmpty && (
              <div className='flex min-h-42 flex-col items-center justify-center gap-4 p-4 text-[#969696]'>
                <SearchXIcon className='size-10' />
                <div className='flex flex-col items-center gap-2 text-center'>
                  <Typography as='p' variant='body-lg'>
                    <IntlText path='page.catalog.search.nothingFound' />
                  </Typography>
                  <Typography as='p' variant='body-sm'>
                    <IntlText path='page.catalog.search.changeQuery' />
                  </Typography>
                </div>
              </div>
            )}

            {!!state.games.length && (
              <ComboboxList
                showScrollbar
                className='max-h-72 p-4 pr-6 [scrollbar-color:#B7B7B7_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-thumb]:rounded-24 [&::-webkit-scrollbar-thumb]:border-x-[6px] [&::-webkit-scrollbar-thumb]:border-y-3 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-[#B7B7B7] [&::-webkit-scrollbar-thumb]:bg-clip-content [&::-webkit-scrollbar-track]:bg-transparent'
              >
                {(game: GameFiltered) => {
                  const priceVariant = game.priceVariant;
                  return (
                    <ComboboxItem
                      key={game.slug}
                      className='h-17.5 rounded-none px-2 py-3 pr-2 data-highlighted:bg-transparent'
                      value={game.slug}
                    >
                      <Link
                        params={{
                          slug: game.slug
                        }}
                        className='flex min-w-0 flex-1 items-center gap-2'
                        to='/games/$slug'
                      >
                        <div className='flex h-10 min-w-0 flex-1 items-center gap-2 sm:max-w-112.5'>
                          <div className='h-10 w-22 shrink-0 overflow-hidden rounded-8'>
                            <img
                              alt={game.name}
                              className='block size-full object-cover object-center'
                              loading='lazy'
                              src={getAsset(game.image)}
                            />
                          </div>
                          <Typography as='span' className='truncate' variant='body-sm'>
                            {game.name}
                          </Typography>
                        </div>

                        <div className='hidden min-w-0 flex-1 items-center sm:flex sm:max-w-112.5'>
                          <Badge>
                            <IntlText
                              path={`deliveryType.${game.priceVariant.deliveryType}` as MessagePath}
                            />{' '}
                          </Badge>
                        </div>

                        <div className='ml-auto flex min-w-fit flex-1 items-center justify-end gap-2'>
                          {priceVariant.oldPrice && (
                            <Badge className='px-2 py-1' variant='accent'>
                              {formatDiscountPercent(priceVariant.price, priceVariant.oldPrice)}
                            </Badge>
                          )}
                          <div className='flex flex-col items-end'>
                            {priceVariant.oldPrice && (
                              <Typography
                                as='span'
                                className='text-muted-fg line-through'
                                variant='caption'
                              >
                                {formatMoney(priceVariant.oldPrice)}
                              </Typography>
                            )}
                            <Typography as='span' variant='body-sm'>
                              от {formatMoney(priceVariant.price)}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    </ComboboxItem>
                  );
                }}
              </ComboboxList>
            )}
          </ComboboxContent>
        </Combobox>
      </div>
    </>
  );
};
