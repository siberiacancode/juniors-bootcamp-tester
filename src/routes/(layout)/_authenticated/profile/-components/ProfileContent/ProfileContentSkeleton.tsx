import { Button } from '@siberiacancode/uikit';

import {
  OrderCard,
  OrderCardBadges,
  OrderCardContent,
  OrderCardHeader
} from '@/components/ui/order-card';
import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib/intl';

export const ProfileContentSkeleton = () => (
  <section className='flex w-full flex-col gap-4'>
    <div className='grid w-full grid-cols-1 gap-6'>
      {Array.from({ length: 2 }, (_, card) => (
        <OrderCard key={card}>
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
            <IntlText path='button.moreDetails' />
          </Button>
        </OrderCard>
      ))}
    </div>
  </section>
);
