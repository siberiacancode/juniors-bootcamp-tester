import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IntlText } from '@/lib';

export const GameCheckoutSkeleton = () => (
  <div className='flex flex-col gap-4'>
    <div className='flex gap-3'>
      <Skeleton className='size-14 shrink-0 rounded-8 bg-muted-fg/30' />
      <div className='flex flex-1 flex-col gap-3'>
        <Skeleton className='h-4 w-4/5 rounded-24 bg-muted-fg/30' />
        <Skeleton className='h-3 w-2/3 rounded-24 bg-muted-fg/10' />
      </div>
    </div>

    {Array.from({ length: 3 }, (_, field) => (
      <Skeleton key={field} className='h-10 w-full rounded-full bg-background' />
    ))}

    <div className='grid grid-cols-2 gap-2'>
      {Array.from({ length: 2 }, (_, method) => (
        <Skeleton key={method} className='min-h-20 rounded-16 bg-background' />
      ))}
    </div>

    <Skeleton className='h-13 w-full rounded-full bg-primary/20' />

    <Button disabled className='w-full' size='lg' type='button'>
      <IntlText path='button.pay' />
    </Button>
  </div>
);
