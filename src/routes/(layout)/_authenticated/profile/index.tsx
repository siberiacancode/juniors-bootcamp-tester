import { Typography } from '@siberiacancode/uikit';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { getGamesOrdersSuspenseQueryOptions, getUsersProfileQueryOptions } from '@/generated/api';
import { IntlText } from '@/utils/lib/intl';

import {
  OrderHistory,
  OrderHistorySkeleton,
  ProfileInfo,
  ProfileInfoSkeleton
} from './-components';

const ProfilePage = () => (
  <section className='mx-auto flex w-full flex-col gap-10 sm:mt-12 lg:flex-row lg:gap-16'>
    <div className='py-3 sm:hidden sm:py-0'>
      <Typography as='h1' variant='title-md'>
        <IntlText path='page.profile.title' />
      </Typography>
    </div>

    <Suspense fallback={<ProfileInfoSkeleton />}>
      <ProfileInfo />
    </Suspense>

    <Suspense fallback={<OrderHistorySkeleton />}>
      <OrderHistory />
    </Suspense>
  </section>
);

export const Route = createFileRoute('/(layout)/_authenticated/profile/')({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(getGamesOrdersSuspenseQueryOptions()),
      context.queryClient.ensureQueryData(getUsersProfileQueryOptions())
    ]),
  component: ProfilePage
});
