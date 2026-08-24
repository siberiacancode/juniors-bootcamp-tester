import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib';

import { CATALOG_GAMES_LIMIT } from '../../../-constants';

export const CatalogSkeleton = () => (
  <div className='flex min-w-0 flex-col items-center gap-6'>
    <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6'>
      {Array.from({ length: CATALOG_GAMES_LIMIT }, (_, index) => index).map((card) => (
        <article key={card} className='flex min-w-0 flex-col gap-2'>
          <Skeleton className='h-39.5 w-full rounded-24' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-2/5 rounded-24' />
            <Skeleton className='h-4 w-2/3 rounded-24 bg-muted-fg/20' />
          </div>
        </article>
      ))}
    </div>

    <div className='flex h-13 w-full items-center justify-center rounded-full bg-primary/20 px-6 py-3 lg:w-78.5'>
      <span className='text-[14px]/[21px] font-medium tracking-wide text-primary-fg'>
        <IntlText path='button.showMore' />
      </span>
    </div>
  </div>
);
