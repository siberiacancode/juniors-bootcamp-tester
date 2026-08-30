import { RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { Spinner } from '@/components/ui/spinner';
import { getCardsCardsQueryOptions, getUsersProfileQueryOptions } from '@/generated/api';
import { queryClient } from '@/utils/lib';

import { Provider } from './provider';
import { router } from './router';

import './styles/globals.css';

const AppLoader = () => (
  <Provider queryClient={queryClient}>
    <div className='flex min-h-dvh items-center justify-center bg-background'>
      <Spinner className='size-10 text-accent-secondary' />
    </div>
  </Provider>
);

const init = async () => {
  const root = createRoot(document.getElementById('root')!);

  root.render(<AppLoader />);

  const getUsersProfileResponse = await queryClient.fetchQuery(
    getUsersProfileQueryOptions({
      params: {
        gcTime: Infinity
      }
    })
  );

  if (getUsersProfileResponse.data.success && getUsersProfileResponse.data.user) {
    await queryClient.fetchQuery(
      getCardsCardsQueryOptions({
        params: {
          gcTime: Infinity
        }
      })
    );
  }

  return root.render(
    <Provider queryClient={queryClient}>
      <RouterProvider router={router} />
    </Provider>
  );
};

init();
