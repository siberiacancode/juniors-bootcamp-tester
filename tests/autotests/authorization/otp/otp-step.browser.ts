import { expect, test } from '@playwright/test';
import { snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/ids.gen';

import { CASE_IDS } from '../(helpers)';
import { OTP_STEP_FILE, VALID_OTP, VALID_PHONE } from '../(helpers)/constants';
import { HTTP_CODES } from '../../../utils/constants';
import { annotation, testCase } from '../../../utils/helpers';

const setupTest: BrowserSetupTest<{ caseId: string; redirect?: string }> = async (
  page,
  { caseId, redirect }
) => {
  await testCase(page, caseId);
  await page.goto(redirect ? `./login/?redirect=${redirect}` : './login/');

  await expect(page.getByTestId(TESTIDS.STATIC.PAGE.LOGIN.SELF_ID)).toBeVisible();

  await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill(VALID_PHONE);

  await Promise.all([
    waitResponse(page, {
      path: '/api/tester/otps/otp',
      method: 'POST',
      status: HTTP_CODES.OK,
      body: { success: true }
    }),
    page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
  ]);
};

test.describe('Авторизация. Проверочный код', () => {
  test(
    'Дизайн',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Дизайн'),
    async ({ page }) => {
      await setupTest(page, { caseId: CASE_IDS.OTP_DESIGN });

      await snapshot(page, 'design');
    }
  );

  test(
    'Войти. Успех',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Войти. Успех'),
    async ({ page }) => {
      await setupTest(page, { caseId: CASE_IDS.OTP_SIGN_IN_SUCCESS });

      await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill(VALID_OTP);

      const submitButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT);
      const retryButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.RETRY);

      await Promise.all([
        waitRequest(page, {
          path: '/api/tester/auth/sign-in',
          method: 'POST',
          body: {
            phone: VALID_PHONE,
            code: Number(VALID_OTP)
          }
        }),
        waitResponse(page, {
          path: '/api/tester/auth/sign-in',
          method: 'POST',
          status: HTTP_CODES.OK
        }),
        waitResponse(page, {
          path: '/api/tester/users/profile',
          method: 'GET',
          status: HTTP_CODES.OK
        }),
        waitResponse(page, {
          path: '/api/tester/cards/cards',
          method: 'GET',
          status: HTTP_CODES.OK
        }),
        expect(submitButton).toBeDisabled(),
        expect(retryButton).toBeDisabled(),
        submitButton.click()
      ]);

      await expect(page).toHaveURL('./');
    }
  );

  test(
    'Войти. Redirect в ссылке',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Войти. Redirect в ссылке'),
    async ({ page }) => {
      await setupTest(page, { caseId: CASE_IDS.OTP_REDIRECT, redirect: '/history' });

      await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill(VALID_OTP);

      await Promise.all([
        waitRequest(page, {
          path: '/api/tester/auth/sign-in',
          method: 'POST',
          body: {
            phone: VALID_PHONE,
            code: Number(VALID_OTP)
          }
        }),
        waitResponse(page, {
          path: '/api/tester/auth/sign-in',
          method: 'POST',
          status: HTTP_CODES.OK
        }),
        waitResponse(page, {
          path: '/api/tester/users/profile',
          method: 'GET',
          status: HTTP_CODES.OK
        }),
        waitResponse(page, {
          path: '/api/tester/cards/cards',
          method: 'GET',
          status: HTTP_CODES.OK
        }),
        page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
      ]);

      await expect(page).toHaveURL('./history');
    }
  );
});
