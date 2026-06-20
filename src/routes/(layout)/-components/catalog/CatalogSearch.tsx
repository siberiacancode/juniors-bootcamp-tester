import { useDebounceValue } from '@siberiacancode/reactuse';
import { Link } from '@tanstack/react-router';
import { Loader2Icon, SearchIcon, XIcon } from 'lucide-react';
import { Fragment, useId, useRef } from 'react';

import type { FilteredGame } from '@/generated/api';

import { Badge } from '@/components/ui/badge';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus
} from '@/components/ui/combobox';
import { InputGroupAddon, InputGroupIconButton } from '@/components/ui/input-group';
import { Typography } from '@/components/ui/typography';
import { useGetGamesSearchQuery } from '@/generated/api';
import { formatDiscountPercent, formatMoney, getGameImageSrc } from '@/helpers/utils';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

interface CatalogSearchProps {
  searchValue: string;
  onSearchValueChange: (value: string) => void;
}

export const CatalogSearch = ({ onSearchValueChange, searchValue }: CatalogSearchProps) => {
  const comboboxAnchorRef = useRef<HTMLDivElement>(null);
  const searchInputId = useId();

  const debouncedValue = useDebounceValue(searchValue, 500);

  const gamesSearchQuery = useGetGamesSearchQuery({
    request: {
      query: {
        search: debouncedValue
      }
    },
    params: {
      enabled: !!debouncedValue.trim()
    }
  });

  const searchGames = gamesSearchQuery.data?.data.games ?? [];

  const isNotEmpty =
    gamesSearchQuery.isLoading ||
    (gamesSearchQuery.isSuccess && searchGames!.length > 0) ||
    debouncedValue.length === 0;

  const onClear = () => {
    onSearchValueChange('');
  };

  return (
    <div className='flex min-w-0 flex-1 flex-col gap-1'>
      <label className='text-[14px]/[22px] font-medium' htmlFor={searchInputId}>
        Поиск
      </label>

      <Combobox
        filter={null}
        items={searchGames}
        openOnInputClick={false}
        onInputValueChange={onSearchValueChange}
      >
        <ComboboxInput
          className='w-full'
          id={searchInputId}
          inputGroupRef={comboboxAnchorRef}
          placeholder='Название игры'
          showTrigger={false}
          value={searchValue}
        >
          <InputGroupAddon align='start'>
            <SearchIcon />
          </InputGroupAddon>
          {!!searchValue && (
            <InputGroupAddon align='end'>
              <InputGroupIconButton onClick={onClear}>
                <XIcon />
              </InputGroupIconButton>
            </InputGroupAddon>
          )}
        </ComboboxInput>
        {!gamesSearchQuery.isPending && (
          <ComboboxContent anchor={comboboxAnchorRef}>
            <ComboboxEmpty className={cn(isNotEmpty && 'hidden')}>Ничего не нашлось</ComboboxEmpty>
            <ComboboxStatus className={cn(!gamesSearchQuery.isLoading && 'hidden')}>
              <Loader2Icon className='animate-spin' />
            </ComboboxStatus>
            <ComboboxList>
              {(game: FilteredGame) => {
                const priceVariant = game.priceVariant;
                return (
                  <Fragment key={game.slug}>
                    <ComboboxItem value={game.slug}>
                      <Link
                        params={{
                          slug: game.slug
                        }}
                        className='flex min-h-10 w-full flex-wrap items-center gap-2'
                        to='/games/$slug'
                      >
                        <div className='flex w-full max-w-112.5 items-center gap-2'>
                          <div className='aspect-460/215 h-10 shrink-0 overflow-hidden rounded-24 lg:rounded-12'>
                            <img
                              alt={game.name}
                              className='object-cover object-center'
                              src={getGameImageSrc(game.image)}
                            />
                          </div>
                          <Typography as='span' className='whitespace-nowrap' variant='body-md'>
                            {game.name}
                          </Typography>
                        </div>

                        <div className='max-w-112.5 flex-1'>
                          <Badge>
                            <IntlText
                              path={`deliveryType.${game.priceVariant.deliveryType}`}
                            />{' '}
                          </Badge>
                        </div>

                        <div className='flex items-center gap-2 justify-self-end'>
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
                  </Fragment>
                );
              }}
            </ComboboxList>
          </ComboboxContent>
        )}
      </Combobox>
    </div>
  );
};
