import { expect, test } from '@playwright/experimental-ct-react';

import { Badge } from '@/components/ui/badge';

test.describe('Root. Component', () => {
  test('Badge рендерит переданный текст', async ({ mount }) => {
    const component = await mount(<Badge>Games</Badge>);

    await expect(component).toContainText('Games');
    await expect(component).toBeVisible();
  });
});
