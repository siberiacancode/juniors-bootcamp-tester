import { Link } from '@tanstack/react-router';

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
import { useGetGamesOrdersSuspenseQuery } from '@/generated/api';
import { getAsset } from '@/helpers/utils';
import { IntlText } from '@/lib/intl';
import { HistoryEmptyState } from '@/routes/-components';

export const OrderHistory = () => {
  const getGamesOrdersSuspenseQuery = useGetGamesOrdersSuspenseQuery();
  const orders = getGamesOrdersSuspenseQuery.data.data.orders;

  return (
    <section className='flex flex-col gap-4'>
      <Typography as='p' className='block sm:hidden' variant='body-md'>
        <IntlText path='page.history.title' />
      </Typography>
      {!orders.length && <HistoryEmptyState />}
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
                  <IntlText path='button.goToOrder' />
                </Link>
              </Button>
            </OrderCard>
          ))}
        </div>
      )}
    </section>
  );
};
