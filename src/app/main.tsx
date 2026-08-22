import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { getCardsCardsQueryOptions, getUsersProfileQueryOptions } from '@/generated/api';
import { queryClient } from '@/utils/lib';

import { Provider } from './provider';
import { router } from './router';

import './styles/globals.css';

const init = async () => {
  const getUsersProfileResponse = await queryClient.ensureQueryData(
    getUsersProfileQueryOptions({
      params: {
        gcTime: Infinity
      }
    })
  );

  if (getUsersProfileResponse.data.user) {
    await queryClient.ensureQueryData(
      getCardsCardsQueryOptions({
        params: {
          gcTime: Infinity
        }
      })
    );
  }

  const root = createRoot(document.getElementById('root')!);

  return root.render(
    <Provider queryClient={queryClient}>
      <RouterProvider router={router} />
    </Provider>
  );
};

init();
