import type { QueryClient } from '@tanstack/react-query';

import { QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';

import { LOCALE, messages } from '@/lib/intl';

interface ProviderProps {
  children: React.ReactNode;
  queryClient: QueryClient;
}

export const Provider = ({ queryClient, children }: ProviderProps) => (
  <IntlProvider defaultLocale={LOCALE} locale={LOCALE} messages={messages}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </IntlProvider>
);
