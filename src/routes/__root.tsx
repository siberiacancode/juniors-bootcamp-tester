import type { QueryClient } from '@tanstack/react-query';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

import { LOCAL_STORAGE_KEYS } from '@/constants';
import { getUsersSessionQueryOptions } from '@/generated/api';

const RootComponent = () => <Outlet />;

interface RootRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: RootComponent,
  beforeLoad: ({ context: { queryClient } }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

    if (token) {
      queryClient.prefetchQuery(getUsersSessionQueryOptions());
    }
  }
});
