import { createRouter } from '@tanstack/react-router';

import { routeTree } from '@/generated/routeTree.gen';

import { queryClient } from '../lib/queryClient';

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
