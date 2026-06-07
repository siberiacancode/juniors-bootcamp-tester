import type { PurchaseHistoryItem } from '../../-constants';

import { PurchaseHistoryCard } from './PurchaseHistoryCard';
import { PurchaseHistoryEmptyState } from './PurchaseHistoryEmptyState';

interface PurchaseHistoryProps {
  orders: PurchaseHistoryItem[];
}

export const PurchaseHistory = ({ orders }: PurchaseHistoryProps) => {
  if (orders.length === 0) {
    return <PurchaseHistoryEmptyState />;
  }

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      {orders.map((order) => (
        <PurchaseHistoryCard key={order._id} order={order} />
      ))}
    </div>
  );
};
