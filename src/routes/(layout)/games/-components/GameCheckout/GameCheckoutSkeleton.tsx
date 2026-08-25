import { Button, Typography } from '@siberiacancode/uikit';

import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/utils/lib';

export const GameCheckoutSkeleton = () => (
  <section className='mt-6 rounded-24 bg-secondary p-6 [grid-area:checkout] lg:mt-0'>
    <div className='flex flex-col gap-4'>
      <div className='flex h-14 gap-2'>
        <Skeleton className='size-14 shrink-0 rounded-8 bg-muted-fg/40' />
        <div className='flex flex-1 flex-col gap-3'>
          <Skeleton className='h-[18px] w-[194px] max-w-full rounded-24 bg-muted-fg/30' />
          <Skeleton className='h-3 w-[163px] max-w-full rounded-24 bg-muted-fg/15' />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <Skeleton className='h-10 w-full rounded-full bg-background' />
        <div className='flex flex-col gap-1'>
          <Typography variant='caption'>
            <IntlText path='field.product.email.label' />
          </Typography>
          <Skeleton className='h-10 w-full rounded-full bg-background' />
        </div>
        <div className='flex flex-col gap-1'>
          <Typography variant='caption'>
            <IntlText path='field.product.phone.label' />
          </Typography>
          <Skeleton className='h-10 w-full rounded-full bg-background' />
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <Typography variant='body-md'>
          <IntlText path='page.gameProduct.paymentMethodTitle' />
        </Typography>
        <div className='grid grid-cols-2 gap-2'>
          {Array.from({ length: 2 }, (_, index) => (
            <div
              key={index}
              className='flex h-20 flex-col justify-between rounded-16 bg-background p-4'
            >
              <Skeleton className='h-6 w-12 rounded-full bg-muted-fg/30' />
              <Skeleton className='h-2.5 w-[68px] rounded-24 bg-muted-fg/15' />
            </div>
          ))}
        </div>
        <div className='flex h-[42px] items-center rounded-16 bg-background p-3'>
          <Skeleton className='h-[18px] w-3/4 rounded-24 bg-muted-fg/15' />
        </div>
      </div>

      <div className='flex h-12 items-center justify-between rounded-16 bg-background p-3'>
        <Typography variant='body-sm'>
          <IntlText path='page.gameProduct.totalLabel' />
        </Typography>
        <Skeleton className='h-[18px] w-[86px] rounded-24 bg-muted-fg/40' />
      </div>

      <Button disabled className='h-13 w-full opacity-20' type='button'>
        <IntlText path='button.pay' />
      </Button>
    </div>
  </section>
);
