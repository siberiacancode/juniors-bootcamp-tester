import { RouterProvider } from '@tanstack/react-router';

import { queryClient } from './lib/queryClient';
import { Provider } from './provider';
import { router } from './router';

export const App = () => (
  <Provider queryClient={queryClient}>
    <RouterProvider router={router} />
  </Provider>
);
