import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonLineProps {
  className?: string;
  isStrong?: boolean;
}

const SkeletonLine = ({ className, isStrong = false }: SkeletonLineProps) => (
  <Skeleton
    className={cn('h-3 rounded-24', isStrong ? 'bg-muted-fg/30' : 'bg-background/70', className)}
  />
);

export const HistorySkeleton = () => (
  <section className='mx-auto flex w-full flex-col gap-24 sm:mt-12 lg:gap-50'>
    <section className='flex w-full flex-col gap-6'>
      <h1 className='text-[40px]/12 font-bold tracking-wide sm:text-[24px]/8'>История покупок</h1>

      <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2'>
        {[0, 1].map((card) => (
          <article key={card} className='flex w-full flex-col gap-4 rounded-24 bg-secondary p-6'>
            <div className='flex flex-col gap-2'>
              <div className='grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2'>
                <Skeleton className='row-span-2 size-14 rounded-8 bg-muted-fg/40' />
                <SkeletonLine isStrong className='mt-1 h-4 w-full max-w-48' />
                <SkeletonLine className='mt-2 w-full max-w-40' />
              </div>

              <div className='flex min-h-8 w-full flex-wrap items-start gap-2'>
                <Skeleton className='h-8 w-30 rounded-full bg-background ring-1 ring-ring' />
                <Skeleton className='h-8 w-30 rounded-full bg-background ring-1 ring-ring' />
              </div>
            </div>

            <div className='flex w-full flex-col gap-4'>
              <div className='flex w-full flex-col items-start'>
                <SkeletonLine isStrong className='w-43' />
              </div>
              <div className='flex w-full flex-col items-start'>
                <SkeletonLine isStrong className='w-12' />
              </div>
            </div>

            <div className='flex h-13 w-full items-center justify-center rounded-full bg-primary/20 px-6 py-3'>
              <span className='text-[14px]/[21px] font-medium tracking-wide text-primary-fg'>
                Подробнее
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  </section>
);
