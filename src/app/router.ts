import { createRouter } from '@tanstack/react-router';

import { routeTree } from '@/generated/router/index.gen';

import { queryClient } from '../lib/query-client';

export const router = createRouter({
  routeTree,
  context: {
    queryClient
  }
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
