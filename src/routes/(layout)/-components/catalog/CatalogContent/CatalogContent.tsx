import { LoaderIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib/intl';

import { CatalogSaleBanner } from '../CatalogSaleBanner';
import { CatalogSkeleton } from '../CatalogSkeleton';
import { GameCard } from '../GameCard';
import { useCatalogContent } from './hooks';

export const CatalogContent = () => {
  const { state, functions } = useCatalogContent();

  return (
    <>
      {state.isLoading && <CatalogSkeleton />}

      {!state.isLoading && (
        <>
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6'>
            {state.games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
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
