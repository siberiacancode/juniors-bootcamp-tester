import { expect, test } from '@playwright/test';
import { snapshot, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { CASE_IDS, GAME_SLUG } from './(helpers)';

const setupTest: BrowserSetupTest<{ caseId: string }> = async (page, { caseId }) => {
  await testCase(page, caseId);

  await Promise.all([
    waitResponse(page, {
      path: `/api/tester/games/info/${GAME_SLUG}`,
      method: 'GET',
      status: HTTP_CODES.INTERNAL_SERVER_ERROR
    }),
    page.goto(`./games/${GAME_SLUG}`)
  ]);

  await expect(page.getByTestId(TESTIDS.CLICKABLE.LINK.HOME)).toBeVisible();
};

test.describe('Системное. Ошибка', () => {
  test('Дизайн', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.ERROR_DESIGN });

    await snapshot(page, 'design');
  });

  test('Перейти на главную', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.ERROR_HOME });

    await page.getByTestId(TESTIDS.CLICKABLE.LINK.HOME).click();

    await expect(page).toHaveURL('./');
  });
});
