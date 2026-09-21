import { expect, test } from '@playwright/test';
import { snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { CASE_IDS } from './(helpers)';

const VALID_PHONE = '77777777771';

const setupTest: BrowserSetupTest<{ caseId: string }> = async (page, { caseId }) => {
  await testCase(page, caseId);
  await page.goto('./login/');

  await expect(page.getByTestId(TESTIDS.STATIC.PAGE.LOGIN.SELF_ID)).toBeVisible();
};

test.describe('Авторизация. Телефон', () => {
  test('Дизайн', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.PHONE_DESIGN });

    await snapshot(page, 'design');
  });

  test('Продолжить. Успех', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.PHONE_SUBMIT_SUCCESS });

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill(VALID_PHONE);

    const submitButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT);

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
      expect(submitButton).toBeDisabled(),
      submitButton.click()
    ]);

    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP)).toBeVisible();
  });

  test('Назад', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.PHONE_BACK });

    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.BACK).click();

    await expect(page).toHaveURL('./');
  });
});
