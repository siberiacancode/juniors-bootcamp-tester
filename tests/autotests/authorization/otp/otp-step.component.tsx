import { expect, test } from '@playwright/experimental-ct-react';
import { waitRequest, waitResponse } from '@siberiacancode/playwright';

import { TESTIDS } from '@/generated/tests/ids.gen';

import { CASE_IDS } from '../(helpers)';
import {
  INVALID_OTP,
  OTP_STEP_FILE,
  VALID_PHONE,
  VALID_PHONE_FORMATTED,
  VALID_PHONE_INPUT
} from '../(helpers)/constants';
import { CASE_ID as SIGN_IN_INVALID_CODE_CASE_ID } from '../(mocks)/sign-in-invalid-code/constants';
import { LoginPageWrapper } from '../(wrappers)';
import { HTTP_CODES } from '../../../utils/constants';
import { annotation, testCase } from '../../../utils/helpers';

const setupTest: ComponentSetupTest<{
  caseId: string;
  step?: 'otp' | 'phone';
  clock?: boolean;
}> = async ({ page, mount }, { caseId, step = 'phone', clock = false }) => {
  if (clock) await page.clock.install();

  await testCase(page, caseId);
  await mount<HooksConfig>(<LoginPageWrapper />, {
    hooksConfig: {
      routerConfig: {
        historyPath: '/login/',
        routePath: '/login/'
      }
    }
  });

  if (step === 'phone') return;

  await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill(VALID_PHONE_INPUT);

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
    'Валидация',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Валидация'),
    async ({ page, mount }) => {
      await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_VALIDATION, step: 'otp' });

      const otpInput = page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP);
      const otpField = page.getByTestId(`${TESTIDS.CHANGEABLE.INPUT.OTP}-field`);
      const otpError = page.getByTestId(`${TESTIDS.CHANGEABLE.INPUT.OTP}-error`);

      await test.step('Показывает ошибку обязательного поля', async () => {
        await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click();

        await expect(otpError).toHaveText('Поле обязательно');
        await expect(otpField).toHaveAttribute('data-invalid', 'true');
      });

      await test.step('Игнорирует нецифровые символы и очищает ошибку', async () => {
        await otpInput.fill('abc');

        await expect(otpInput).toHaveValue('');
        await expect(otpError).toBeHidden();
        await expect(otpField).toHaveAttribute('data-invalid', 'false');
      });
    }
  );

  test(
    'Назад (телефон)',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Назад (телефон)'),
    async ({ page, mount }) => {
      await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_BACK_PHONE, step: 'otp' });

      await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.BACK).click();

      await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE)).toHaveValue(
        VALID_PHONE_FORMATTED
      );
    }
  );

  test(
    'Войти. Неправильный отп код',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Войти. Неправильный отп код'),
    async ({ page, mount }) => {
      await setupTest({ page, mount }, { caseId: SIGN_IN_INVALID_CODE_CASE_ID, step: 'otp' });

      await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill(INVALID_OTP);

      await Promise.all([
        waitRequest(page, {
          path: '/api/tester/auth/sign-in',
          method: 'POST',
          body: {
            phone: VALID_PHONE,
            code: Number(INVALID_OTP)
          }
        }),
        waitResponse(page, {
          path: '/api/tester/auth/sign-in',
          method: 'POST',
          status: HTTP_CODES.BAD_REQUEST,
          body: {
            success: false,
            reason: 'Неправильный отп код'
          }
        }),
        page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
      ]);

      await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.INPUT.OTP}-error`)).toHaveText(
        'Неправильный отп код'
      );
    }
  );

  test(
    'Войти. Таймер',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Войти. Таймер'),
    async ({ page, mount }) => {
      await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_TIMER, step: 'otp', clock: true });

      const retryButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.RETRY);

      await test.step('Отображает disabled-кнопку с начальными секундами', async () => {
        await expect(retryButton).toContainText('30');
        await expect(retryButton).toBeDisabled();
      });

      await test.step('Уменьшает счетчик посекундно', async () => {
        await page.clock.fastForward(3000);

        await expect(retryButton).toContainText('27');
        await expect(retryButton).toBeDisabled();
      });

      await test.step('Активирует повторную отправку после окончания таймера', async () => {
        await page.clock.fastForward(27_000);

        await expect(retryButton).toBeEnabled();
      });
    }
  );

  test(
    'Войти. Отправить код повторно',
    annotation(OTP_STEP_FILE, 'Авторизация. Проверочный код. Войти. Отправить код повторно'),
    async ({ page, mount }) => {
      await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_RETRY, step: 'otp', clock: true });

      await page.clock.fastForward(30_000);

      const retryButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.RETRY);

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
        retryButton.click()
      ]);

      await expect(retryButton).toContainText('30');
      await expect(retryButton).toBeDisabled();
    }
  );
});
