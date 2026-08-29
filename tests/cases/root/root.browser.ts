import { expect, test } from '@playwright/test';

test.describe('Root. Browser', () => {
  test('на странице есть games', async ({ page }) => {
    await page.goto('/tester/');

    await expect(page.getByRole('banner').getByRole('link', { name: /GAMES/ })).toBeVisible();
  });
});
