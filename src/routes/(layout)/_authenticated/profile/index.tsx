import { createFileRoute, Link } from '@tanstack/react-router';

import { MascotFrontIcon } from '@/components/icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { getGamesOrdersSuspenseQueryOptions, getUsersSessionQueryOptions } from '@/generated/api';
import { DELIVERY_LABELS, PAYMENT_METHOD, REGION_LABELS } from '@/helpers/constants';
import { getGameImageSrc } from '@/helpers/utils';
import { IntlText } from '@/lib/intl';
import { HistoryEmptyState, LogoutConfirmation } from '@/routes/-components';

import { EditProfile, ProfileSkeleton } from './-components';
import { useProfilePage } from './-hooks';

const ProfilePage = () => {
  const { user, orders, state, features, functions } = useProfilePage();

  return (
    <section className='mx-auto flex flex-col gap-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(20rem,25rem)_minmax(0,1fr)] lg:gap-16'>
      <div className='py-3 sm:hidden sm:py-0'>
        <Typography as='h1' variant='title-md'>
          <IntlText path='page.profile.title' />
        </Typography>
      </div>
      <section className='flex flex-col gap-4'>
        <div className='flex flex-col items-center gap-4 lg:flex-row'>
          <Avatar className='bg-secondary' size='xl'>
            <AvatarFallback className='bg-secondary text-[32px]/[40px] font-medium text-foreground'>
              {!state.displayName ? (
                <MascotFrontIcon />
              ) : (
                (state.displayName || user.email || 'A').trim().charAt(0).toUpperCase()
              )}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
            <Typography as='p' variant='body-lg'>
              {state.displayName || <IntlText path='page.profile.fallbackName' />}
            </Typography>
            <Typography as='p' className='text-foreground/50' variant='caption'>
              {user.email || features.phoneMask.watch().displayValue}
            </Typography>
            {user.email && (
              <Typography as='p' variant='caption'>
                {features.phoneMask.watch().displayValue}
              </Typography>
            )}
          </div>
        </div>
        <div className='flex w-full flex-col items-center gap-2.5 p-4 sm:p-0'>
          <Button
            className='w-full'
            size='lg'
            type='button'
            variant='secondary'
            onClick={features.editDialog.open}
          >
            <IntlText path='button.profile.edit' />
          </Button>
          <Button className='w-full' size='lg' type='button' onClick={features.confirmDialog.open}>
            <IntlText path='button.logout.confirm' />
          </Button>
        </div>
      </section>
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
      </section>
      {features.confirmDialog.opened && (
        <LogoutConfirmation
          onConfirm={functions.onLogout}
          onOpenChange={features.confirmDialog.toggle}
        />
      )}
      {features.editDialog.opened && (
        <EditProfile onCancel={features.editDialog.close} onSuccess={features.editDialog.close} />
      )}
    </section>
  );
};

export const Route = createFileRoute('/(layout)/_authenticated/profile/')({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(getUsersSessionQueryOptions()),
      context.queryClient.ensureQueryData(getGamesOrdersSuspenseQueryOptions())
    ]),
  pendingComponent: ProfileSkeleton,
  component: ProfilePage
});
