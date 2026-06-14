import type { QueryClient } from '@tanstack/react-query';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

const RootComponent = () => <Outlet />;

interface RootRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent
});
