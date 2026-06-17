import { createFileRoute, Link } from '@tanstack/react-router';

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
import {
  getGamesOrdersSuspenseQueryOptions,
  useGetGamesOrdersSuspenseQuery
} from '@/generated/api';
import { DELIVERY_LABELS, PAYMENT_METHOD, REGION_LABELS } from '@/helpers/constants';
import { getGameImageSrc } from '@/helpers/utils';
import { queryClient } from '@/lib';
import { IntlText } from '@/lib/intl';
import { HistoryEmptyState } from '@/routes/-components';

export const Route = createFileRoute('/(layout)/_authenticated/history/')({
  loader: () => queryClient.ensureQueryData(getGamesOrdersSuspenseQueryOptions()),
  component: HistoryPage
});

function HistoryPage() {
  const getGamesOrdersSuspenseQuery = useGetGamesOrdersSuspenseQuery();
  const orders = getGamesOrdersSuspenseQuery.data.data.orders;

  return (
    <main className='flex w-full max-w-[1256px] flex-col gap-6 pt-14'>
      <Typography as='h1' variant='title-md'>
        <IntlText path='page.history.title' />
      </Typography>
      {!orders.length && <HistoryEmptyState />}
      {!!orders.length && (
        <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2'>
          {orders.map((order) => (
            <OrderCard key={order._id}>
              <div className='flex w-full flex-col gap-2'>
                <OrderCardHeader>
                  <OrderCardThumbnail
                    alt={order.gameSnapshot.name}
                    src={getGameImageSrc(order.gameSnapshot.image)}
                  />
                  <OrderCardTitle>{order.gameSnapshot.name}</OrderCardTitle>
                  <OrderCardSubtitle>{order.gameSnapshot.edition}</OrderCardSubtitle>
                </OrderCardHeader>

                <OrderCardBadges>
                  <OrderCardBadge>{REGION_LABELS[order.gameSnapshot.region]}</OrderCardBadge>
                  <OrderCardBadge>
                    {DELIVERY_LABELS[order.gameSnapshot.deliveryType]}
                  </OrderCardBadge>
                </OrderCardBadges>
              </div>

              <OrderCardContent>
                <OrderCardField>
                  <OrderCardFieldLabel>
                    <IntlText path='card.order.emailLabel' />
                  </OrderCardFieldLabel>
                  <OrderCardFieldValue>{order.person.email}</OrderCardFieldValue>
                </OrderCardField>

                <OrderCardField>
                  <OrderCardFieldLabel>
                    <IntlText path='card.order.paymentMethodLabel' />
                  </OrderCardFieldLabel>
                  <OrderCardFieldValue>{PAYMENT_METHOD}</OrderCardFieldValue>
                </OrderCardField>
              </OrderCardContent>

              <Button asChild className='w-full' size='lg'>
                <Link params={{ orderId: order._id }} to='/history/$orderId'>
                  <IntlText path='button.goToOrder' />
                </Link>
              </Button>
            </OrderCard>
          ))}
        </div>
      )}
    </main>
  );
}
