import { expect, test } from '@playwright/test';
import { snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/ids.gen';

import { HTTP_CODES } from '../../utils/constants';
import { annotation, testCase } from '../../utils/helpers';
import { CASE_IDS } from './(helpers)';
import { PHONE_STEP_FILE, VALID_PHONE, VALID_PHONE_INPUT } from './(helpers)/constants';

const setupTest: BrowserSetupTest<{ caseId: string }> = async (page, { caseId }) => {
  await testCase(page, caseId);
  await page.goto('./login/');

  await expect(page.getByTestId(TESTIDS.STATIC.PAGE.LOGIN.SELF_ID)).toBeVisible();
};

test.describe('Авторизация. Телефон', () => {
  test('Дизайн', annotation(PHONE_STEP_FILE, 'Авторизация. Телефон. Дизайн'), async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.PHONE_DESIGN });

    await snapshot(page, 'design');
  });

  test(
    'Продолжить. Успех',
    annotation(PHONE_STEP_FILE, 'Авторизация. Телефон. Продолжить. Успех'),
    async ({ page }) => {
      await setupTest(page, { caseId: CASE_IDS.PHONE_SUBMIT_SUCCESS });

      await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill(VALID_PHONE_INPUT);

      await Promise.all([
        waitRequest(page, {
          path: '/api/tester/otps/otp',
          method: 'POST',
          body: { phone: VALID_PHONE }
        }),
        waitResponse(page, {
          path: '/api/tester/otps/otp',
          method: 'POST',
          status: HTTP_CODES.OK,
          body: { success: true }
        }),
        page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
      ]);
    }
  );

  test('Назад', annotation(PHONE_STEP_FILE, 'Авторизация. Телефон. Назад'), async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.PHONE_BACK });

    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.BACK).click();

    await expect(page).toHaveURL('./');
  });
});
