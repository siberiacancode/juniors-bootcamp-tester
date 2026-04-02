import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { App } from './app.tsx';
import { queryClient } from './queryclient.ts';

import './assets/global.css';

const init = async () => {
  const root = createRoot(document.getElementById('root')!);

  return root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

init();
