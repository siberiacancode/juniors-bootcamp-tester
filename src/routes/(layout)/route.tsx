import { createFileRoute, Outlet } from '@tanstack/react-router';

import { ErrorState, NotFound } from '@/routes/-components';

import { Footer, Header, MobileNav } from './-components/layout';

const RouteComponent = () => (
  <div className='mx-auto flex min-h-dvh w-full max-w-7xl flex-col p-4 px-4 pt-6 sm:py-16'>
    <Header />
    <div className='flex flex-1 flex-col'>
      <Outlet />
    </div>
    <Footer />
    <MobileNav />
  </div>
);

export const Route = createFileRoute('/(layout)')({
  component: RouteComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorState
});
