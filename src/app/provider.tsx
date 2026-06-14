import type { QueryClient } from '@tanstack/react-query';

import { QueryClientProvider } from '@tanstack/react-query';

interface ProviderProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export const Provider = ({ queryClient, children }: ProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
