import { Button } from '@siberiacancode/uikit';

import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib/intl';

export const ProfileInfoSkeleton = () => (
  <section className='mx-auto flex w-full max-w-[328px] flex-col gap-4 lg:mx-0 lg:max-w-[374px]'>
    <div className='flex w-full flex-col items-center gap-4 lg:flex-row'>
      <Skeleton className='size-[86px] rounded-full bg-secondary' />

      <div className='flex w-full min-w-0 flex-col items-center gap-2 text-center lg:w-[272px] lg:items-start lg:text-left'>
        <Skeleton className='h-4.5 w-60 max-w-full rounded-24 bg-secondary lg:w-full' />
        <Skeleton className='mt-0.5 h-4.5 w-45 max-w-full rounded-24 bg-secondary' />
        <Skeleton className='mt-0.5 h-4.5 w-45 max-w-full rounded-24 bg-secondary' />
      </div>
    </div>

    <div className='flex w-full flex-col items-start gap-2.5 lg:items-center lg:gap-4'>
      <Button disabled className='w-full' size='lg' type='button' variant='secondary'>
        <IntlText path='button.editProfile' />
      </Button>
      <Button disabled className='w-full' size='lg' type='button'>
        <IntlText path='button.logout' />
      </Button>
    </div>
  </section>
);
