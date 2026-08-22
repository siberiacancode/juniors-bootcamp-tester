import { Typography } from '@siberiacancode/uikit';
import { ChevronLeftIcon } from 'lucide-react';

import { OrderCard, OrderCardContent } from '@/components/ui/order-card';
import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib/intl';

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

    <OrderCard className='h-[290px]'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex h-14 w-full items-start gap-2'>
          <Skeleton className='size-14 shrink-0 rounded-8 bg-muted-fg' />

          <div className='flex h-full min-w-0 flex-1 flex-col items-start gap-3'>
            <Skeleton className='h-[18px] w-[194px] max-w-full rounded-24 bg-muted-fg/70' />
            <Skeleton className='h-3 w-[163px] max-w-full rounded-24 bg-muted-fg/20' />
          </div>
        </div>

        <div className='flex min-h-8 w-full flex-wrap items-start gap-2'>
          <Skeleton className='h-8 w-30 rounded-full bg-background ring-1 ring-ring' />
          <Skeleton className='h-8 w-30 rounded-full bg-background ring-1 ring-ring' />
        </div>
      </div>

      <OrderCardContent>
        <div className='flex w-full flex-col items-start'>
          <Skeleton className='h-8 w-[216px] max-w-full rounded-24 bg-muted-fg/70' />
        </div>

        {[171, 104, 47].map((width) => (
          <div key={width} className='flex w-full flex-col items-start'>
            <Skeleton className='h-3 max-w-full rounded-24 bg-muted-fg/70' style={{ width }} />
          </div>
        ))}
      </OrderCardContent>
    </OrderCard>
  </main>
);
