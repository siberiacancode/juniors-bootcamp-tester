import type { QueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { ThemeProvider } from '@siberiacancode/uikit/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';

import { Toaster } from '@/components/ui/sonner';
import { LOCALE, messages } from '@/utils/lib/intl';

interface ProviderProps {
  children: ReactNode;
  queryClient: QueryClient;
}

export const Provider = ({ queryClient, children }: ProviderProps) => (
  <ThemeProvider>
    <IntlProvider defaultLocale={LOCALE} locale={LOCALE} messages={messages}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </IntlProvider>
  </ThemeProvider>
);
