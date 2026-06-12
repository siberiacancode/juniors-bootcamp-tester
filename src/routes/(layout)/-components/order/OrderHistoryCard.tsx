import { Link } from '@tanstack/react-router';

import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';
import { DELIVERY_LABELS, REGION_LABELS } from '@/shared/constants';

import type { OrderHistoryItem } from '../../-constants';

import { OrderHistoryBadge } from './OrderHistoryBadge';

interface OrderHistoryCardProps {
  order: OrderHistoryItem;
}

export const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => (
  <article className='flex flex-col gap-4 rounded-24 bg-secondary p-6'>
    <div className='flex items-start gap-3 sm:gap-2.5'>
      <img
        alt={order.gameSnapshot.name}
        className='size-16 shrink-0 rounded-12 object-cover sm:size-16'
        src={order.gameSnapshot.image}
      />
      <div className='flex-1'>
        <Typography as='p' className='text-[18px]/[26px] sm:text-[18px]/6.5' variant='body-lg'>
          {order.gameSnapshot.name}
        </Typography>
        <Typography
          as='p'
          className='text-[16px]/[22px] text-foreground/50 sm:text-[16px]/6'
          variant='body-md'
        >
          {order.gameSnapshot.edition}
        </Typography>
      </div>
    </div>

    <div className='flex flex-wrap gap-2'>
      <OrderHistoryBadge>{REGION_LABELS[order.gameSnapshot.region]}</OrderHistoryBadge>
      <OrderHistoryBadge>
        {DELIVERY_LABELS[order.gameSnapshot.deliveryType]}
      </OrderHistoryBadge>
    </div>

    <div className='flex flex-col gap-4'>
      <div className='flex flex-col'>
        <Typography
          as='p'
          className='text-[14px]/[22px] font-medium text-foreground/50 sm:text-[16px]/6'
          variant='body-md'
        >
          Почта, куда отправили детали покупки
        </Typography>
        <Typography
          as='p'
          className='text-[16px]/6 font-medium tracking-normal sm:text-[18px]/6.5'
          variant='body-lg'
        >
          {order.person.email}
        </Typography>
      </div>

      <div className='flex flex-col gap-1'>
        <Typography
          as='p'
          className='text-[14px]/[22px] font-medium text-foreground/50 sm:text-[16px]/6'
          variant='body-md'
        >
          Способ оплаты
        </Typography>
        <Typography
          as='p'
          className='text-[16px]/6 font-medium tracking-normal sm:text-[18px]/6.5'
          variant='body-lg'
        >
          {order.paymentMethod}
        </Typography>
      </div>
    </div>
    <Button asChild className='w-full' size='lg'>
      <Link params={{ orderId: order._id }} to='/history/$orderId'>
        Подробнее
      </Link>
    </Button>
  </article>
);
