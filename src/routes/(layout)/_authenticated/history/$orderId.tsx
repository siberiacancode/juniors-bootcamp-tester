import { OrderDetailsCard } from '@modules/order';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { InboxIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { useGetGamesOrderByOrderIdQuery } from '@/generated/api';

import { HistoryDetailsHeader } from './-components';

const PAYMENT_METHOD = 'JB Pay';

const RouteComponent = () => {
  const orderId = useParams({
    select: (params) => params.orderId,
    from: '/(layout)/_authenticated/history/$orderId'
  });

  const { data, isLoading } = useGetGamesOrderByOrderIdQuery({
    request: {
      path: {
        orderId
      }
    }
  });
  const { order, success } = data?.data ?? {};

  if (isLoading) {
    return (
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
        <HistoryDetailsHeader />
        <Skeleton className='h-120 rounded-24' />
      </main>
    );
  }

  if (!order || success === false) {
    return (
      <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
        <HistoryDetailsHeader />

        <section className='rounded-24 bg-secondary px-6 py-10 sm:px-10 sm:py-12'>
          <div className='mx-auto flex max-w-xl flex-col items-center gap-5 text-center sm:gap-6'>
            <div className='flex size-16 items-center justify-center rounded-full border border-foreground/10 bg-background sm:size-18'>
              <InboxIcon className='size-8 sm:size-9' strokeWidth={1.75} />
            </div>

            <div className='flex flex-col gap-2 sm:gap-3'>
              <Typography
                as='h2'
                className='text-[24px]/8 font-medium tracking-normal sm:text-[32px]/10'
                variant='body-lg'
              >
                Покупка не найдена
              </Typography>
              <Typography
                as='p'
                className='max-w-80 text-[16px]/6 font-medium tracking-normal text-foreground/70 sm:max-w-none sm:text-[18px]/6.5'
                variant='body-md'
              >
                Похоже, этой покупки больше нет в истории или ссылка устарела.
              </Typography>
            </div>

            <Button asChild className='mt-1 w-full sm:mt-2' size='lg'>
              <Link to='/history'>Вернуться к истории</Link>
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='mx-auto flex w-full max-w-3xl flex-col gap-8'>
      <HistoryDetailsHeader />

      <OrderDetailsCard
        order={{
          ...order,
          paymentAmount: order.gameSnapshot.price,
          paymentMethod: PAYMENT_METHOD
        }}
      />
    </main>
  );
};

export const Route = createFileRoute('/(layout)/_authenticated/history/$orderId')({
  component: RouteComponent
});
