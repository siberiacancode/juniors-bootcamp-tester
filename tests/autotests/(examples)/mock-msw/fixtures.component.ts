import type { NetworkFixture } from '@msw/playwright';

import { defineNetworkFixture } from '@msw/playwright';
import { test as base } from '@playwright/experimental-ct-react';

interface Fixtures {
  network: NetworkFixture;
}

export const test = base.extend<Fixtures>({
  network: [
    async ({ context }, use) => {
      const network = defineNetworkFixture({
        context
      });

      await network.enable();
      await use(network);
      await network.disable();
    },
    { auto: true }
  ]
});

export { expect } from '@playwright/experimental-ct-react';
