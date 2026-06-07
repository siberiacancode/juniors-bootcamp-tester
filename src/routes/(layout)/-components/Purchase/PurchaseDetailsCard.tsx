import { Typography } from '@/shared/components/ui/typography';
import { DELIVERY_LABELS, REGION_LABELS } from '@/shared/constants';

import type { PurchaseHistoryItem } from '../../-constants';

import { PurchaseHistoryBadge } from './PurchaseHistoryBadge';

interface PurchaseDetailsCardProps {
  order: PurchaseHistoryItem;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 0
  }).format(price);

export const PurchaseDetailsCard = ({ order }: PurchaseDetailsCardProps) => (
  <article className='flex flex-col gap-4 rounded-24 bg-secondary p-6 sm:gap-6 sm:p-8'>
    <div className='flex items-start gap-4 sm:gap-3'>
      <img
        alt={order.gameSnapshot.name}
        className='size-20 shrink-0 rounded-16 object-cover sm:size-18 sm:rounded-12'
        src={order.gameSnapshot.image}
      />
      <div className='min-w-0 flex-1'>
        <Typography
          as='h2'
          className='text-[18px]/[26px] tracking-normal sm:text-[24px]/8'
          variant='body-lg'
        >
          {order.gameSnapshot.name}
        </Typography>
        <Typography
          as='p'
          className='mt-1 text-[16px]/[22px] font-normal tracking-normal text-foreground/50 sm:text-[18px]/7'
          variant='body-md'
        >
          {order.gameSnapshot.edition}
        </Typography>
      </div>
    </div>

    <div className='flex flex-wrap gap-2'>
      <PurchaseHistoryBadge>{REGION_LABELS[order.gameSnapshot.region]}</PurchaseHistoryBadge>
      <PurchaseHistoryBadge>
        {DELIVERY_LABELS[order.gameSnapshot.deliveryType]}
      </PurchaseHistoryBadge>
    </div>

    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
        <Typography
          as='p'
          className='text-[18px]/[26px] font-normal tracking-normal sm:text-[24px]/8'
          variant='body-lg'
        >
          Ваш Steam-ключ для активации
        </Typography>
        <Typography
          as='p'
          className='text-[24px]/8 font-bold tracking-normal sm:text-[40px]/12'
          variant='title-md'
        >
          {order.gameKey}
        </Typography>
      </div>

      <div className='flex flex-col gap-1'>
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

      <div className='flex flex-col gap-1'>
        <Typography
          as='p'
          className='text-[14px]/[22px] font-medium text-foreground/50 sm:text-[16px]/6'
          variant='body-md'
        >
          Сумма
        </Typography>
        <Typography
          as='p'
          className='text-[16px]/6 font-medium tracking-normal sm:text-[18px]/6.5'
          variant='body-lg'
        >
          {formatPrice(order.paymentAmount)} ₽
        </Typography>
      </div>
    </div>
  </article>
);
