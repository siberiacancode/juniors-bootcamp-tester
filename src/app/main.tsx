import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { queryClient } from '@/lib';

import { Provider } from './provider';
import { router } from './router';

import './styles/globals.css';

const init = async () => {
  const root = createRoot(document.getElementById('root')!);

  return root.render(
    <Provider queryClient={queryClient}>
      <RouterProvider router={router} />
    </Provider>
  );
};

init();
