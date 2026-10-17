import { expect, test } from '@playwright/test';
import { snapshot } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/index.gen';

import { testCase } from '../../../utils/helpers';
import { CASE_IDS } from './(helpers)';

const setupTest: BrowserSetupTest<{ caseId: string }> = async (page, { caseId }) => {
  await testCase(page, caseId);
  await page.goto('./non-existent-page');

  await expect(page.getByTestId(TESTIDS.CLICKABLE.LINK.HOME)).toBeVisible();
};

test.describe('Системное. 404', () => {
  test('Дизайн', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.NOT_FOUND_DESIGN });

    await snapshot(page, 'design');
  });

  test('Перейти на главную', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.NOT_FOUND_HOME });

    await page.getByTestId(TESTIDS.CLICKABLE.LINK.HOME).click();

    await expect(page).toHaveURL('./');
  });
});
