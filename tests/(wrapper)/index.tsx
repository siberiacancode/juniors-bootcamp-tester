import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { ThemeProvider } from '@siberiacancode/uikit/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  defaultStringifySearch,
  RouterProvider
} from '@tanstack/react-router';
import { IntlProvider } from 'react-intl';

import { LOCALE, messages } from '@/utils/lib/intl';

import './global.css';

beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  });

  const rootRoute = createRootRoute();
  const history = createBrowserHistory();

  if (hooksConfig?.routerConfig) {
    rootRoute.addChildren([
      createRoute({
        getParentRoute: () => rootRoute,
        path: hooksConfig.routerConfig.routePath,
        component: App
      })
    ]);

    history.push(
      `${hooksConfig.routerConfig.historyPath}${defaultStringifySearch(
        hooksConfig.routerConfig.searchParams ?? {}
      )}`
    );
  } else {
    rootRoute.update({ component: App });
  }

  const mockRouter = createRouter({
    routeTree: rootRoute,
    history
  });

  return (
    <ThemeProvider>
      <IntlProvider defaultLocale={LOCALE} locale={LOCALE} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={mockRouter} />
        </QueryClientProvider>
      </IntlProvider>
    </ThemeProvider>
  );
});
