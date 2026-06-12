import type { OrderHistoryItem } from '../../-constants';

import { OrderHistoryCard } from './OrderHistoryCard';
import { OrderHistoryEmptyState } from './OrderHistoryEmptyState';

interface OrderHistoryProps {
  orders: OrderHistoryItem[];
}

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
  if (orders.length === 0) {
    return <OrderHistoryEmptyState />;
  }

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      {orders.map((order) => (
        <OrderHistoryCard key={order._id} order={order} />
      ))}
    </div>
  );
};
