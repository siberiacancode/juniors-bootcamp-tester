import type { ComponentFixtures } from '@playwright/experimental-ct-react';
import type { Page } from '@playwright/test';
import type { QueryClient, QueryKey } from '@tanstack/react-query';

declare global {
  interface HooksConfig {
    queryConfig?: {
      queryKey: QueryKey;
      updater: Parameters<QueryClient['setQueryData']>[1];
      options?: Parameters<QueryClient['setQueryData']>[2];
    }[];
    routerConfig?: {
      historyPath: string;
      routePath: string;
      searchParams?: Record<string, unknown>;
    };
  }

  type ComponentSetupTest<Options> = (
    fixtures: {
      page: Page;
      mount: ComponentFixtures['mount'];
    },
    options: Options
  ) => Promise<void>;

  type BrowserSetupTest<Options> = (page: Page, options: Options) => Promise<void>;
}

export {};
