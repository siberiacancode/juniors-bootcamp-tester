import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

const skeletonCards = Array.from({ length: 15 }, (_, index) => index);

const CatalogCardSkeleton = ({ className }: { className?: string }) => (
  <article className={cn('flex min-w-0 flex-col gap-2', className)}>
    <Skeleton className='h-[158px] w-full rounded-24' />
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-5 w-2/5 rounded-24' />
      <Skeleton className='h-4 w-2/3 rounded-24 bg-secondary/80' />
    </div>
  </article>
);

export const CatalogSkeleton = () => (
  <div className='flex min-w-0 flex-col items-center gap-6'>
    <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-x-4 lg:gap-y-6'>
      {skeletonCards.map((card) => (
        <CatalogCardSkeleton key={card} className={cn(card >= 4 && 'hidden lg:flex')} />
      ))}
    </div>

    <div className='flex h-13 w-full items-center justify-center rounded-full bg-primary/20 px-6 py-3 lg:w-[314px]'>
      <span className='text-[14px]/[21px] font-medium tracking-wide text-primary-fg'>
        <IntlText path='button.showMore' />
      </span>
    </div>
  </div>
);
