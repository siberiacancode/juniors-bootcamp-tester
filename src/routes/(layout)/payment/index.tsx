import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { CheckIcon } from 'lucide-react';
import z from 'zod';

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
  getGamesOrdersPaidSuspenseQueryOptions,
  useGetGamesOrdersPaidSuspenseQuery
} from '@/generated/api';
import { formatMoney, getAsset } from '@/helpers/utils';
import { queryClient } from '@/lib';
import { IntlText } from '@/lib/intl';

const paymentSearchSchema = z.object({
  token: z.coerce.string().min(1),
  status: z.enum(['success', 'fail'])
});

export const Route = createFileRoute('/(layout)/payment/')({
  beforeLoad: ({ location }) => {
    const paymentSearchResult = paymentSearchSchema.safeParse(location.search);
    if (!paymentSearchResult.success) {
      throw redirect({
        to: '/'
      });
    }
  },
  component: PaymentPage,
  validateSearch: paymentSearchSchema,
  loaderDeps: ({ search }) => ({
    token: search.token
  }),
  loader: async ({ deps }) => {
    const getGamesPaidOrderResponse = await queryClient.ensureQueryData(
      getGamesOrdersPaidSuspenseQueryOptions({
        request: {
          query: {
            token: deps.token
          }
        },
        params: {
          gcTime: Infinity
        }
      })
    );

    if (!getGamesPaidOrderResponse.data.success || !getGamesPaidOrderResponse.data.order) {
      throw redirect({
        to: '/'
      });
    }
  }
});

function PaymentPage() {
  const search = Route.useSearch();

  return <PaymentResultPage token={search.token} />;
}

function PaymentResultPage({ token }: { token: string }) {
  const getGamesPaidOrderSuspenseQuery = useGetGamesOrdersPaidSuspenseQuery({
    request: {
      query: {
        token
      }
    }
  });
  const order = getGamesPaidOrderSuspenseQuery.data.data.order;

  return (
    <section className='flex w-full flex-col gap-6 px-0 pt-6 pb-28 sm:max-w-162 sm:pt-14 sm:pb-10'>
      <Typography as='h1' className='text-[24px]/8 tracking-normal' variant='title-md'>
        <IntlText path='page.payment.title' />
      </Typography>

      <OrderCard>
        <div className='flex min-h-8 w-full items-center gap-4'>
          <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white'>
            <CheckIcon className='size-5' strokeWidth={3} />
          </span>
          <Typography as='p' className='min-w-0 flex-1' variant='body-lg'>
            <IntlText path='card.order.success' />
          </Typography>
        </div>

        {order.gameKey && (
          <div className='flex w-full flex-col'>
            <Typography as='p' className='w-full font-normal' variant='body-md'>
              <IntlText path='card.order.steamKeyLabel' />
            </Typography>
            <Typography as='p' className='w-full break-words' variant='title-md'>
              {order.gameKey}
            </Typography>
          </div>
        )}

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

          <OrderCardField>
            <OrderCardFieldLabel>
              <IntlText path='card.order.amountLabel' />
            </OrderCardFieldLabel>
            <OrderCardFieldValue>{formatMoney(order.price)}</OrderCardFieldValue>
          </OrderCardField>
        </OrderCardContent>
      </OrderCard>

      <Button asChild className='w-full' size='lg'>
        <Link to='/'>
          <IntlText path='button.backToGamesCatalog' />
        </Link>
      </Button>
    </section>
  );
}
