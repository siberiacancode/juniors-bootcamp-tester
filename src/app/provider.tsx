import type { QueryClient } from '@tanstack/react-query';

import { QueryClientProvider } from '@tanstack/react-query';

import type { User } from '@/shared/api/generated';

import { UserProvider } from '@/shared/contexts/user';

interface ProviderProps {
  children: React.ReactNode;
  queryClient: QueryClient;
  user: User | null;
}

export const Provider = ({ queryClient, user, children }: ProviderProps) => (
  <QueryClientProvider client={queryClient}>
    <UserProvider user={user}>{children}</UserProvider>
  </QueryClientProvider>
);
