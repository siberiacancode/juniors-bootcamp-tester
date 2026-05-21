import type { QueryClient } from '@tanstack/react-query';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import type { UserContextValue } from '@/shared/contexts/user';

const RootComponent = () => <Outlet />;

interface RootRouteContext {
  queryClient: QueryClient;
  user: UserContextValue;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent
});
