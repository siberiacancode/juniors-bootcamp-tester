import { RouterProvider } from '@tanstack/react-router';

import { router } from './router';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => <RouterProvider router={router} />;
