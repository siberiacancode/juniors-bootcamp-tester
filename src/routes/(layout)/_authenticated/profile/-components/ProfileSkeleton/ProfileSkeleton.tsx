import { Skeleton } from '@/components/ui/skeleton';

// TODO: Обновить дизайн после добавления в фигму
const OrderCardSkeleton = () => (
  <article className='flex w-full flex-col gap-4 rounded-24 bg-secondary p-6'>
    <div className='grid w-full grid-cols-[auto_minmax(0,1fr)] gap-x-2'>
      <Skeleton className='row-span-2 size-14 rounded-8' />
      <Skeleton className='mt-1 h-5 w-3/4' />
      <Skeleton className='mt-2 h-4 w-1/2' />
    </div>

    <div className='flex flex-wrap gap-2'>
      <Skeleton className='h-8 w-24 rounded-full' />
      <Skeleton className='h-8 w-28 rounded-full' />
    </div>

    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-5 w-3/4' />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-5 w-2/3' />
      </div>
    </div>

    <Skeleton className='h-12 w-full rounded-full' />
  </article>
);

export const ProfileSkeleton = () => (
  <section className='mx-auto flex flex-col gap-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(20rem,25rem)_minmax(0,1fr)] lg:gap-16'>
    <div className='py-3 sm:hidden sm:py-0'>
      <Skeleton className='h-8 w-28' />
    </div>

    <section className='flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-4 lg:flex-row'>
        <Skeleton className='size-24 rounded-full' />

        <div className='flex w-full flex-col items-center gap-2 lg:items-start'>
          <Skeleton className='h-7 w-48' />
          <Skeleton className='h-4 w-40' />
          <Skeleton className='h-4 w-36' />
        </div>
      </div>

      <div className='flex w-full flex-col gap-2.5 p-4 sm:p-0'>
        <Skeleton className='h-12 w-full rounded-full' />
        <Skeleton className='h-12 w-full rounded-full' />
      </div>
    </section>

    <section className='flex flex-col gap-4'>
      <Skeleton className='block h-6 w-36 sm:hidden' />

      <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2'>
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </section>
  </section>
);
