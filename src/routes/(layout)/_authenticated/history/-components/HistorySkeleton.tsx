import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/lib/intl';

export const HistorySkeleton = () => (
  <section className='mx-auto flex w-full flex-col gap-24 sm:mt-12 lg:gap-50'>
    <section className='flex w-full flex-col gap-6'>
      <h1 className='text-[24px]/8 font-bold tracking-wide sm:text-[24px]/8'>
        <IntlText path='page.history.title' />
      </h1>

      <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2'>
        {[0, 1].map((card) => (
          <article key={card} className='flex w-full flex-col gap-4 rounded-24 bg-secondary p-6'>
            <div className='flex flex-col gap-2'>
              <div className='grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2'>
                <Skeleton className='row-span-2 size-14 rounded-8 bg-muted-fg/40' />
                <Skeleton className='mt-1 h-4 w-full max-w-48 rounded-24 bg-muted-fg/30' />
                <Skeleton className='mt-2 h-3 w-full max-w-40 rounded-24 bg-background/70' />
              </div>

              <div className='flex min-h-8 w-full flex-wrap items-start gap-2'>
                <Skeleton className='h-8 w-30 rounded-full bg-background ring-1 ring-ring' />
                <Skeleton className='h-8 w-30 rounded-full bg-background ring-1 ring-ring' />
              </div>
            </div>

            <div className='flex w-full flex-col gap-4'>
              <div className='flex w-full flex-col items-start'>
                <Skeleton className='h-3 w-43 rounded-24 bg-muted-fg/30' />
              </div>
              <div className='flex w-full flex-col items-start'>
                <Skeleton className='h-3 w-12 rounded-24 bg-muted-fg/30' />
              </div>
            </div>

            <Button disabled className='w-full' size='lg' type='button'>
              <IntlText path='button.goToOrder' />
            </Button>
          </article>
        ))}
      </div>
    </section>
  </section>
);
