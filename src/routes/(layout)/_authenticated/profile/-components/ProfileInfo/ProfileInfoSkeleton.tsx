import { Button } from '@siberiacancode/uikit';

import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib/intl';

export const ProfileInfoSkeleton = () => (
  <section className='flex w-full max-w-[374px] flex-col gap-4'>
    <div className='flex w-full flex-row items-center gap-4'>
      <Skeleton className='size-[86px] rounded-full bg-secondary' />

      <div className='flex w-full min-w-0 flex-col items-start gap-2 text-left lg:w-[272px]'>
        <Skeleton className='h-4.5 w-60 max-w-full rounded-24 bg-secondary' />
        <Skeleton className='mt-0.5 h-4.5 w-45 max-w-full rounded-24 bg-secondary' />
        <Skeleton className='mt-0.5 h-4.5 w-45 max-w-full rounded-24 bg-secondary' />
      </div>
    </div>

    <div className='flex w-full flex-col items-center gap-4'>
      <Button disabled className='w-full' size='lg' type='button' variant='secondary'>
        <IntlText path='button.editProfile' />
      </Button>
      <Button disabled className='w-full' size='lg' type='button'>
        <IntlText path='button.logout' />
      </Button>
    </div>
  </section>
);
