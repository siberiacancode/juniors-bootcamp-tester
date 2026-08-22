import { InputGroup, InputGroupAddon, InputGroupInput, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';
import { LoaderCircleIcon, SearchIcon, SearchXIcon, XIcon } from 'lucide-react';

import type { GameFiltered } from '@/generated/api';

import { Badge } from '@/components/ui/badge';
import { Combobox, ComboboxContent, ComboboxList } from '@/components/ui/combobox';
import { formatDiscountPercent, formatMoney, getAsset } from '@/utils/helpers';
import { intl, IntlText } from '@/utils/lib';
import { cn } from '@/utils/lib/utils';

import { useCatalogSearch } from './hooks';

export const CatalogSearch = () => {
  const { refs, state, functions } = useCatalogSearch();

  return (
    <>
      {state.isDropdownOpen && (
        <div
          className='fixed inset-0 z-60 bg-foreground/40'
          onPointerDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            functions.onSearchClose();
          }}
        />
      )}

      <div
        ref={refs.searchRef}
        className={cn('relative flex min-w-0 flex-1 flex-col', state.isDropdownOpen && 'z-70')}
      >
        <Combobox
          filter={null}
          items={state.games}
          open={state.isDropdownOpen}
          openOnInputClick={false}
        >
          <InputGroup ref={refs.comboboxAnchorRef} className='relative w-full bg-background pr-11'>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              aria-label={intl.formatMessage({ id: 'page.catalog.search.label' })}
              placeholder={intl.formatMessage({ id: 'page.catalog.search.placeholder' })}
              value={state.searchValue}
              onChange={(event) => functions.onSearchValueChange(event.target.value)}
              onClick={functions.onSearchOpen}
              onFocus={functions.onSearchOpen}
            />
            {!!state.searchValue && (
              <button
                aria-label='Очистить поиск'
                className='absolute top-1/2 right-4 z-10 flex size-5 -translate-y-1/2 items-center justify-center text-foreground/50 transition-colors hover:text-foreground'
                type='button'
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  functions.onClear();
                }}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <XIcon className='size-4.5' />
              </button>
            )}
          </InputGroup>
          <ComboboxContent anchor={refs.comboboxAnchorRef} className='p-0'>
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
                className='max-h-72 scrollbar-thin [scrollbar-color:#B7B7B7_transparent] p-4 pr-6 [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-thumb]:rounded-24 [&::-webkit-scrollbar-thumb]:border-x-[6px] [&::-webkit-scrollbar-thumb]:border-y-3 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-[#B7B7B7] [&::-webkit-scrollbar-thumb]:bg-clip-content [&::-webkit-scrollbar-track]:bg-transparent'
              >
                {(game: GameFiltered) => {
                  const priceVariant = game.priceVariant;
                  const oldPrice = priceVariant.oldPrice;
                  const hasPriceDiscount = !!oldPrice && oldPrice !== priceVariant.price;

                  return (
                    <div key={game.slug} className='h-17.5 rounded-none px-2 py-3 pr-2'>
                      <Link
                        params={{
                          slug: game.slug
                        }}
                        className='flex min-w-0 flex-1 items-center gap-2'
                        to='/games/$slug'
                        onClick={functions.onSearchClose}
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

                        <div className='ml-auto grid w-[138px] shrink-0 grid-cols-[52px_minmax(0,1fr)] items-center gap-1'>
                          {hasPriceDiscount && (
                            <Badge className='w-[52px] justify-center px-2 py-1' variant='accent'>
                              {formatDiscountPercent(priceVariant.price, oldPrice)}
                            </Badge>
                          )}
                          <div className='col-start-2 flex min-w-0 flex-col items-end'>
                            {hasPriceDiscount && (
                              <Typography
                                as='span'
                                className='text-muted-fg line-through'
                                variant='caption'
                              >
                                {formatMoney(oldPrice)}
                              </Typography>
                            )}
                            <Typography as='span' variant='body-sm'>
                              от {formatMoney(priceVariant.price)}
                            </Typography>
                          </div>
                        </div>
                      </Link>
                    </div>
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
