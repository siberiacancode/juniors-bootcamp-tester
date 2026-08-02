import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/lib/intl';

export const ProfileInfoSkeleton = () => (
  <section className='flex flex-col gap-4'>
    <div className='flex flex-col items-center gap-4 lg:flex-row'>
      <Skeleton className='size-22 rounded-full bg-secondary' />

      <div className='flex flex-col items-center gap-2 text-center lg:items-start lg:text-left'>
        <Skeleton className='h-4.5 w-60 rounded-24 bg-secondary' />
        <Skeleton className='mt-0.5 h-4.5 w-45 rounded-24 bg-secondary' />
        <Skeleton className='mt-0.5 h-4.5 w-45 rounded-24 bg-secondary' />
      </div>
    </div>

    <div className='flex w-full flex-col items-center gap-2.5 p-4 sm:p-0'>
      <Button disabled className='w-full' size='lg' type='button' variant='secondary'>
        <IntlText path='button.editProfile' />
      </Button>
      <Button disabled className='w-full' size='lg' type='button'>
        <IntlText path='button.logout' />
      </Button>
    </div>
  </section>
);
