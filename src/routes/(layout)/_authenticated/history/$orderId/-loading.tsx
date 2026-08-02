import { ChevronLeftIcon } from 'lucide-react';

import {
  OrderCard,
  OrderCardBadges,
  OrderCardContent,
  OrderCardHeader
} from '@/components/ui/order-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib/intl';

export const HistoryOrderLoading = () => (
  <main className='flex w-full max-w-162 flex-col gap-6 pt-14'>
    <div className='flex w-full items-center gap-4'>
      <span className='flex size-6 shrink-0 items-center justify-center'>
        <ChevronLeftIcon className='size-6' strokeWidth={2} />
      </span>
      <Typography as='h1' className='min-w-0 flex-1 text-[24px]/8' variant='title-md'>
        <IntlText path='page.history.details.title' />
      </Typography>
    </div>

    <OrderCard className='min-h-101'>
      <div className='flex w-full flex-col gap-2'>
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
        <div className='flex w-full flex-col items-start gap-2'>
          <Skeleton className='h-4 w-40 rounded-24 bg-muted-fg/20' />
          <Skeleton className='h-6 w-full max-w-100 rounded-24 bg-muted-fg/30' />
        </div>

        {Array.from({ length: 3 }, (_, field) => (
          <div key={field} className='flex w-full flex-col items-start gap-1'>
            <Skeleton className='h-3 w-32 rounded-24 bg-muted-fg/20' />
            <Skeleton className='mt-1 h-3 w-56 rounded-24 bg-muted-fg/30 lg:w-48' />
          </div>
        ))}
      </OrderCardContent>
    </OrderCard>
  </main>
);
