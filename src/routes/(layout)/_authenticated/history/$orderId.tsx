import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';

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
  getGamesOrderByOrderIdSuspenseQueryOptions,
  useGetGamesOrderByOrderIdSuspenseQuery
} from '@/generated/api';
import { formatMoney, getGameImageSrc } from '@/helpers/utils';
import { queryClient } from '@/lib';
import { IntlText } from '@/lib/intl';

export const Route = createFileRoute('/(layout)/_authenticated/history/$orderId')({
  loader: async ({ params }) => {
    const getGamesOrderByOrderIdResponse = await queryClient.ensureQueryData(
      getGamesOrderByOrderIdSuspenseQueryOptions({
        request: {
          path: {
            orderId: params.orderId
          }
        }
      })
    );

    if (
      !getGamesOrderByOrderIdResponse.data.success ||
      !getGamesOrderByOrderIdResponse.data.order
    ) {
      throw redirect({
        to: '/history'
      });
    }
  },
  component: HistoryOrderPage
});

function HistoryOrderPage() {
  const params = Route.useParams();
  const getGamesOrderByOrderIdSuspenseQuery = useGetGamesOrderByOrderIdSuspenseQuery({
    request: {
      path: {
        orderId: params.orderId
      }
    }
  });
  const order = getGamesOrderByOrderIdSuspenseQuery.data.data.order!;

  return (
    <main className='flex w-full max-w-162 flex-col gap-6 pt-14'>
      <div className='flex w-full items-center gap-4'>
        <Link className='flex size-6 shrink-0 items-center justify-center' to='/history'>
          <ChevronLeftIcon className='size-6' strokeWidth={2} />
        </Link>
        <Typography as='h1' className='min-w-0 flex-1 text-[24px]/8' variant='title-md'>
          <IntlText path='page.history.details.title' />
        </Typography>
      </div>

      <OrderCard className='min-h-101'>
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
            <OrderCardBadge>
              <IntlText path={`region.${order.gameSnapshot.region}`} />
            </OrderCardBadge>
            <OrderCardBadge>
              <IntlText path={`deliveryType.${order.gameSnapshot.deliveryType}`} />
            </OrderCardBadge>
          </OrderCardBadges>
        </div>

        <OrderCardContent>
          {order.gameKey && (
            <div className='flex w-full flex-col items-start'>
              <Typography as='p' className='w-full text-[18px]/[26px]' variant='body-md'>
                <IntlText path='card.order.steamKeyLabel' />
              </Typography>
              <Typography as='p' className='w-full text-[24px]/8' variant='title-md'>
                {order.gameKey}
              </Typography>
            </div>
          )}

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

          <OrderCardField>
            <OrderCardFieldLabel>
              <IntlText path='card.order.amountLabel' />
            </OrderCardFieldLabel>
            <OrderCardFieldValue>{formatMoney(order.gameSnapshot.price)}</OrderCardFieldValue>
          </OrderCardField>
        </OrderCardContent>
      </OrderCard>
    </main>
  );
}
