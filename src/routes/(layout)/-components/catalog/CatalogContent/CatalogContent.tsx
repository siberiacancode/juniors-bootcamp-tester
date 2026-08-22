import { Button, Typography } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';
import { LoaderIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { formatDiscountPercent, formatMoney, getAsset } from '@/utils/helpers';
import { IntlText } from '@/utils/lib/intl';

import { CatalogSaleBanner } from '../CatalogSaleBanner/CatalogSaleBanner';
import { CatalogSkeleton } from '../CatalogSkeleton/CatalogSkeleton';
import { useCatalogContent } from './hooks';

export const CatalogContent = () => {
  const { state, functions } = useCatalogContent();

  return (
    <>
      {state.isLoading && <CatalogSkeleton />}
      {!state.isLoading && (
        <>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6'>
            {state.games.map((game) => {
              const priceVariant = game.priceVariant;
              const oldPrice = priceVariant.oldPrice;
              const hasPriceDiscount = !!oldPrice && oldPrice !== priceVariant.price;

              return (
                <Link
                  key={game.slug}
                  className='group block min-w-0 rounded-24 outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
                  params={{ slug: game.slug }}
                  to='/games/$slug'
                >
                  <div className='h-[158px] w-full overflow-hidden rounded-24 bg-secondary'>
                    <img
                      alt={game.name}
                      className='block size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]'
                      loading='lazy'
                      src={getAsset(game.image)}
                    />
                  </div>

                  <div className='mt-2 flex min-w-0 flex-col'>
                    <div className='flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1'>
                      <Typography
                        as='span'
                        className='text-[16px]/6 font-medium tracking-wide'
                        variant='body-lg'
                      >
                        {formatMoney(priceVariant.price)}
                      </Typography>
                      {hasPriceDiscount && (
                        <Badge
                          className='px-2 py-1 text-[12px]/4 font-bold tracking-wide'
                          variant='accent'
                        >
                          {formatDiscountPercent(priceVariant.price, oldPrice)}
                        </Badge>
                      )}
                      {hasPriceDiscount && (
                        <Typography
                          as='span'
                          className='text-[14px]/[22px] font-medium tracking-wide text-foreground/40 line-through'
                          variant='body-md'
                        >
                          {formatMoney(oldPrice)}
                        </Typography>
                      )}
                    </div>

                    <Typography
                      as='h2'
                      className='min-w-0 text-[16px]/6 font-medium tracking-wide text-foreground'
                      variant='body-lg'
                    >
                      {game.name}
                    </Typography>
                  </div>
                </Link>
              );
            })}
          </div>

          {!state.games.length && (
            <div className='flex min-h-64 items-center justify-center rounded-24 bg-secondary px-6 text-center'>
              <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
                <IntlText path='page.catalog.games.nothingFound' />
              </Typography>
            </div>
          )}

          <div className='flex justify-center'>
            {state.hasNextPage && (
              <Button
                className='h-13 w-full lg:w-78.5'
                disabled={state.isFetching}
                onClick={functions.fetchNextPage}
              >
                {state.isFetchingNextPage && <LoaderIcon className='animate-spin' />}
                <IntlText path='button.showMore' />
              </Button>
            )}
          </div>
        </>
      )}

      <CatalogSaleBanner className='lg:hidden' />
    </>
  );
};
