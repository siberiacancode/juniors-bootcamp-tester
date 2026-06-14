import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { useGetGamesOrdersQuery } from '@/generated/api';

import { OrderHistoryCard } from './OrderHistoryCard';
import { OrderHistoryEmptyState } from './OrderHistoryEmptyState';

const PAYMENT_METHOD = 'JB Pay';

export const OrderHistory = () => {
  const { data, isError, isLoading, refetch } = useGetGamesOrdersQuery();
  const { orders = [], success } = data?.data ?? {};

  if (isLoading) {
    return (
      <div className='flex flex-col gap-4 sm:gap-6'>
        <Skeleton className='h-72 rounded-24' />
        <Skeleton className='h-72 rounded-24' />
      </div>
    );
  }

  if (isError || success === false) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 rounded-24 bg-secondary p-6 text-center'>
        <div className='flex flex-col gap-2'>
          <Typography as='h3' className='text-[24px]/8 font-medium' variant='body-lg'>
            Не удалось загрузить историю
          </Typography>
          <Typography
            as='p'
            className='max-w-80 text-[16px]/6 font-medium text-foreground/60'
            variant='body-md'
          >
            Попробуйте повторить запрос.
          </Typography>
        </div>
        <Button className='w-full sm:w-auto' size='lg' type='button' onClick={() => refetch()}>
          Повторить
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return <OrderHistoryEmptyState />;
  }

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      {orders.map((order) => (
        <OrderHistoryCard
          key={order._id}
          order={{
            ...order,
            paymentAmount: order.gameSnapshot.price,
            paymentMethod: PAYMENT_METHOD
          }}
        />
      ))}
    </div>
  );
};
