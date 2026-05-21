import { createRoot } from 'react-dom/client';

import { getUsersSession } from '@/shared/api/generated';
import { LOCAL_STORAGE_KEYS } from '@/shared/constants';

import { App } from './app';
import { queryClient } from './lib/queryClient';
import { Provider } from './provider';

import './styles/globals.css';

const init = async () => {
  const root = createRoot(document.getElementById('root')!);

  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  let user = null;

  if (token) {
    const response = await getUsersSession();
    if (response.data.success) user = response.data.user;
  }

  return root.render(
    <Provider queryClient={queryClient} user={user}>
      <App />
    </Provider>
  );
};

init();
