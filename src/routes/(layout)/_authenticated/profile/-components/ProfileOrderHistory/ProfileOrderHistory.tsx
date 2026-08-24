import { Button } from '@siberiacancode/uikit';
import { Link } from '@tanstack/react-router';

import type { GameOrdersResponse } from '@/generated/api';

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
import { useGetGamesOrdersSuspenseQuery } from '@/generated/api';
import { HistoryEmptyState } from '@/routes/-components';
import { getAsset } from '@/utils/helpers';
import { IntlText } from '@/utils/lib/intl';

export const ProfileOrderHistory = () => {
  const getGamesOrdersSuspenseQuery = useGetGamesOrdersSuspenseQuery();
  const getGamesOrdersData = getGamesOrdersSuspenseQuery.data.data as GameOrdersResponse;
  const orders = getGamesOrdersData.orders;

  return (
    <section className='flex w-full flex-col gap-4'>
      {!orders.length && <HistoryEmptyState />}
      {!!orders.length && (
        <div className='grid w-full grid-cols-1 gap-6'>
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
    </section>
  );
};
