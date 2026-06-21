import { Button } from '@/components/ui/button';
import {
  OrderCard,
  OrderCardBadges,
  OrderCardContent,
  OrderCardHeader
} from '@/components/ui/order-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib/intl';
import { cn } from '@/lib/utils';

export const ProfileSkeleton = () => (
  <section className='mx-auto flex flex-col gap-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(20rem,25rem)_minmax(0,1fr)] lg:gap-16'>
    <div className='py-3 sm:hidden sm:py-0'>
      <Typography as='h1' variant='title-md'>
        <IntlText path='page.profile.title' />
      </Typography>
    </div>

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
          <IntlText path='button.profile.edit' />
        </Button>
        <Button disabled className='w-full' size='lg' type='button'>
          <IntlText path='button.logout.confirm' />
        </Button>
      </div>
    </section>

    <section className='flex flex-col gap-4'>
      <Typography as='p' className='block sm:hidden' variant='body-md'>
        <IntlText path='page.history.title' />
      </Typography>

      <div className='grid w-full grid-cols-1 gap-6'>
        {[0, 1].map((card) => (
          <OrderCard key={card} className={cn(card === 1 && 'hidden lg:flex')}>
            <div className='flex flex-col gap-2'>
              <OrderCardHeader>
                <Skeleton className='row-span-2 size-14 rounded-8 bg-muted-fg/40' />
                <Skeleton className='mt-1 h-6 w-full max-w-88 rounded-24 bg-muted-fg/30 lg:max-w-96' />
                <Skeleton className='h-3 w-full max-w-72 rounded-24 bg-muted-fg/10 lg:max-w-80' />
              </OrderCardHeader>

              <OrderCardBadges>
                <Skeleton className='h-8 w-34 rounded-full bg-background ring-1 ring-ring lg:w-30' />
                <Skeleton className='h-8 w-38 rounded-full bg-background ring-1 ring-ring lg:w-30' />
              </OrderCardBadges>
            </div>

            <OrderCardContent>
              <div className='flex w-full flex-col items-start'>
                <Skeleton className='mt-1 h-3 w-56 rounded-24 bg-muted-fg/30 lg:w-43' />
              </div>

              <div className='flex w-full flex-col items-start'>
                <Skeleton className='mt-1 h-3 w-16 rounded-24 bg-muted-fg/30 lg:w-12' />
              </div>
            </OrderCardContent>

            <Button disabled className='w-full' size='lg' type='button'>
              <IntlText path='button.goToOrder' />
            </Button>
          </OrderCard>
        ))}
      </div>
    </section>
  </section>
);
