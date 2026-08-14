import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { getUsersProfileQueryOptions } from '@/generated/api';
import { LOCAL_STORAGE_KEYS } from '@/helpers/constants';
import { queryClient } from '@/lib';

import { Provider } from './provider';
import { router } from './router';

import './styles/globals.css';

const init = async () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  if (token) {
    await queryClient.ensureQueryData(getUsersProfileQueryOptions({}));
  }

  const root = createRoot(document.getElementById('root')!);

  return root.render(
    <Provider queryClient={queryClient}>
      <RouterProvider router={router} />
    </Provider>
  );
};

init();
