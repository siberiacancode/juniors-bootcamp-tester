import type { QueryClient } from '@tanstack/react-query';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Layout } from '@/routes/(layout)/-layout';
import { ErrorState, NotFound } from '@/routes/-components';

const RootComponent = () => (
  <>
    <Outlet />
    {import.meta.env.DEV && (
      <TanStackDevtools
        plugins={[
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />
          },
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />
          }
        ]}
      />
    )}
  </>
);

interface RootRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  notFoundComponent: () => (
    <Layout>
      <NotFound />
    </Layout>
  ),
  errorComponent: () => (
    <Layout>
      <ErrorState />
    </Layout>
  )
});
