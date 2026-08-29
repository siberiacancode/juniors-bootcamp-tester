import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { ThemeProvider } from '@siberiacancode/uikit/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';

import { LOCALE, messages } from '@/utils/lib/intl';

import '@/app/styles/globals.css';

beforeMount(async ({ App }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  });

  return (
    <ThemeProvider>
      <IntlProvider defaultLocale={LOCALE} locale={LOCALE} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </IntlProvider>
    </ThemeProvider>
  );
});
