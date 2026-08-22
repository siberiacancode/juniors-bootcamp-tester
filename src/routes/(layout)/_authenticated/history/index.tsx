import { Button, Typography } from '@siberiacancode/uikit';
import { createFileRoute, Link } from '@tanstack/react-router';

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
import {
  getGamesOrdersSuspenseQueryOptions,
  useGetGamesOrdersSuspenseQuery
} from '@/generated/api';
import { HistoryEmptyState } from '@/routes/-components';
import { getAsset } from '@/utils/helpers';
import { queryClient } from '@/utils/lib';
import { IntlText } from '@/utils/lib/intl';

import { HistoryLoading } from './-loading';

function HistoryPage() {
  const getGamesOrdersSuspenseQuery = useGetGamesOrdersSuspenseQuery();
  const orders = getGamesOrdersSuspenseQuery.data.data.orders;

  return (
    <main className='mb-110 flex w-full max-w-314 flex-col gap-6 sm:mb-0 sm:pt-14'>
      <Typography as='h1' variant='title-md'>
        <IntlText path='page.history.title' />
      </Typography>
      {!orders.length && (
        <div className='max-w-160'>
          <HistoryEmptyState />
        </div>
      )}
      {!!orders.length && (
        <div className='grid w-full grid-cols-1 gap-6 lg:grid-cols-2'>
          {orders.map((order) => (
            <OrderCard key={order._id}>
              <div className='flex w-full flex-col gap-2'>
                <OrderCardHeader>
                  <OrderCardThumbnail alt={order.gameName} src={getAsset(order.gameImage)} />
                  <OrderCardTitle>{order.gameName}</OrderCardTitle>
                  <OrderCardSubtitle>{order.edition}</OrderCardSubtitle>
                </OrderCardHeader>

                <OrderCardBadges>
                  <OrderCardBadge>
                    <IntlText path={`region.${order.region}`} />
                  </OrderCardBadge>
                  <OrderCardBadge>
                    <IntlText path={`deliveryType.${order.deliveryType}`} />
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
                  <OrderCardFieldValue>
                    <IntlText path='card.order.paymentMethod' />
                  </OrderCardFieldValue>
                </OrderCardField>
              </OrderCardContent>

              <Button asChild className='w-full' size='lg'>
                <Link params={{ orderId: order._id }} to='/history/$orderId'>
                  <IntlText path='button.moreDetails' />
                </Link>
              </Button>
            </OrderCard>
          ))}
        </div>
      )}
    </main>
  );
}

export const Route = createFileRoute('/(layout)/_authenticated/history/')({
  loader: () => queryClient.ensureQueryData(getGamesOrdersSuspenseQueryOptions()),
  component: HistoryPage,
  pendingComponent: HistoryLoading
});
