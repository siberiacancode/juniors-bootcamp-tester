import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';

import type { CreateGameOrderDto, GameOrder } from '@/generated/api';

import { Button } from '@/components/ui/button';
import {
  OrderCard,
  OrderCardBadge,
  OrderCardBadges,
  OrderCardContent,
  OrderCardField,
  OrderCardFieldLabel,
  OrderCardFieldValue,
  OrderCardHeader,
  OrderCardSubtitle,
  OrderCardThumbnail,
  OrderCardTitle
} from '@/components/ui/order-card';
import { Typography } from '@/components/ui/typography';
import { useGetUsersSessionQuery, usePostGamesOrderMutation } from '@/generated/api';
import { DELIVERY_LABELS, REGION_LABELS } from '@/helpers/constants';
import { formatMoney, getGameImageSrc } from '@/helpers/utils';

const PAYMENT_METHOD = 'JB Карта, *0000';
const GAME_KEY_FALLBACK = '2G73NTU91S';
const paymentRequest = {
  body: {
    debitCard: '0000',
    deliveryType: 'steam_key',
    edition: 'Standard',
    gameSlug: 'titanfall-2',
    person: {
      email: 'juniorsbootcamp@mail.ru',
      phone: '79999999999'
    },
    region: 'all_world'
  } satisfies CreateGameOrderDto
};
const PaymentPage = () => {
  const dataQuery = useGetUsersSessionQuery();
  const postGamesOrderMutation = usePostGamesOrderMutation();
  const [order, setOrder] = useState<GameOrder>();
  const user = dataQuery.data?.data.user;

  const onPay = async () => {
    const postGamesOrderResponse = await postGamesOrderMutation.mutateAsync(paymentRequest);

    if (postGamesOrderResponse.data.success) {
      setOrder(postGamesOrderResponse.data.order);
    }
  };

  return (
    <section className='flex w-full flex-col gap-6 pt-8 pb-28 sm:w-[648px] sm:max-w-[648px] sm:pt-10 sm:pb-0'>
      <Typography as='h1' className='text-[24px]/8 tracking-normal' variant='title-md'>
        Информация о покупке
      </Typography>

      {!order && (
        <div className='flex flex-col gap-4 rounded-24 bg-secondary p-6'>
          <Typography as='p' variant='body-lg'>
            Подтверждение оплаты
          </Typography>
          <Typography as='p' className='text-foreground/60' variant='body-md'>
            Нажмите кнопку, чтобы отправить тестовый запрос на оплату.
          </Typography>

          <Button
            className='mt-2 w-full'
            disabled={postGamesOrderMutation.isPending}
            size='lg'
            type='button'
            onClick={onPay}
          >
            {postGamesOrderMutation.isPending ? 'Оплачиваем...' : 'Оплатить'}
          </Button>
        </div>
      )}

      {!!order && (
        <>
          <OrderCard>
            <div className='flex min-h-8 w-full items-center gap-4'>
              <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white'>
                <CheckIcon className='size-5' strokeWidth={3} />
              </span>
              <Typography as='p' className='min-w-0 flex-1' variant='body-lg'>
                Оплата прошла успешно
              </Typography>
            </div>

            <div className='flex w-full flex-col'>
              <Typography as='p' className='w-full font-normal' variant='body-md'>
                Ваш Steam-ключ для активации
              </Typography>
              <Typography as='p' className='w-full' variant='title-md'>
                {order.gameKey ?? GAME_KEY_FALLBACK}
              </Typography>
            </div>

            <div className='flex w-full flex-col items-start gap-2'>
              <OrderCardHeader>
                <OrderCardThumbnail
                  alt={order.gameSnapshot.name}
                  src={getGameImageSrc(order.gameSnapshot.image)}
                />
                <OrderCardTitle>{order.gameSnapshot.name}</OrderCardTitle>
                <OrderCardSubtitle>{order.gameSnapshot.edition}</OrderCardSubtitle>
              </OrderCardHeader>

              <OrderCardBadges>
                <OrderCardBadge>Регион {REGION_LABELS[order.gameSnapshot.region]}</OrderCardBadge>
                <OrderCardBadge>{DELIVERY_LABELS[order.gameSnapshot.deliveryType]}</OrderCardBadge>
              </OrderCardBadges>
            </div>

            <OrderCardContent>
              <OrderCardField>
                <OrderCardFieldLabel>Почта, куда отправили детали покупки</OrderCardFieldLabel>
                <OrderCardFieldValue>{order.person.email}</OrderCardFieldValue>
              </OrderCardField>

              <OrderCardField>
                <OrderCardFieldLabel>Способ оплаты</OrderCardFieldLabel>
                <OrderCardFieldValue>{PAYMENT_METHOD}</OrderCardFieldValue>
              </OrderCardField>

              <OrderCardField>
                <OrderCardFieldLabel>Сумма</OrderCardFieldLabel>
                <OrderCardFieldValue>{formatMoney(order.gameSnapshot.price)}</OrderCardFieldValue>
              </OrderCardField>
            </OrderCardContent>
          </OrderCard>

          {user && (
            <Button asChild className='w-full' size='lg'>
              <Link to='/'>Вернуться в каталог игр</Link>
            </Button>
          )}
        </>
      )}
    </section>
  );
};

export const Route = createFileRoute('/(layout)/payment/')({
  component: PaymentPage
});
