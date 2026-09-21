import { expect, test } from '@playwright/experimental-ct-react';
import { waitRequest, waitResponse } from '@siberiacancode/playwright';

import type { CreateOtpResponse, ErrorResponse } from '@/generated/api';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { CASE_IDS, VALID_OTP, VALID_PHONE } from './(helpers)';
import { LoginPageWrapper } from './(wrappers)';

interface SetupTestOptions {
  caseId: string;
  clock?: boolean;
}

type SetupTestFixtures = Parameters<ComponentSetupTest<SetupTestOptions>>[0];

const setupTest = async (
  { page, mount }: SetupTestFixtures,
  { caseId, clock = false }: SetupTestOptions
) => {
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

  await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill(VALID_PHONE);

  const [otpResponse] = await Promise.all([
    waitResponse(page, {
      path: '/api/tester/otps/otp',
      method: 'POST',
      status: HTTP_CODES.OK,
      body: { success: true }
    }),
    page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
  ]);

  const otpData = (await otpResponse.json()) as CreateOtpResponse;

  return { otpData };
};

test.describe('Авторизация. Проверочный код', () => {
  test('Валидация', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_VALIDATION });

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

    await test.step('Показывает ошибку неполного кода', async () => {
      await otpInput.fill('123');
      await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click();

      await expect(otpError).toHaveText('Заполните поле полностью');
      await expect(otpField).toHaveAttribute('data-invalid', 'true');
    });
  });

  test('Назад (телефон)', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_BACK_PHONE });

    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.BACK).click();

    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE)).toBeVisible();
    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE)).toHaveValue('+7 777 777 77 71');
  });

  test('Маска', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_MASK });

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill('1234567');

    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP)).toHaveValue('123456');
  });

  test('Легал', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_LEGAL });

    const legalText = page.getByTestId(TESTIDS.STATIC.PAGE.LOGIN.LEGAL);
    const legalLink = legalText.getByRole('link');

    await expect(legalLink).toHaveAttribute('href', 'https://juniorsbootcamp.ru/api/otps');
  });

  test('Войти. Неправильный отп код', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_SIGN_IN_INVALID_CODE });

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill('111111');

    const [, signInResponse] = await Promise.all([
      waitRequest(page, {
        path: '/api/tester/auth/sign-in',
        method: 'POST',
        body: {
          phone: VALID_PHONE,
          code: 111111
        }
      }),
      waitResponse(page, {
        path: '/api/tester/auth/sign-in',
        method: 'POST',
        status: HTTP_CODES.BAD_REQUEST
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
    ]);
    const signInData = (await signInResponse.json()) as ErrorResponse;

    await expect(page.getByTestId(`${TESTIDS.CHANGEABLE.INPUT.OTP}-error`)).toHaveText(
      signInData.reason
    );
  });

  test('Войти. Таймер', async ({ page, mount }) => {
    const { otpData } = await setupTest(
      { page, mount },
      { caseId: CASE_IDS.OTP_TIMER, clock: true }
    );
    const retryDelaySeconds = otpData.retryDelay / 1000;

    const retryButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.RETRY);

    await test.step('Отображает disabled-кнопку с начальными секундами', async () => {
      await expect(retryButton).toContainText(String(retryDelaySeconds));
      await expect(retryButton).toBeDisabled();
    });

    await test.step('Уменьшает счетчик посекундно', async () => {
      await page.clock.fastForward(3000);

      await expect(retryButton).toContainText(String(retryDelaySeconds - 3));
      await expect(retryButton).toBeDisabled();
    });

    await test.step('Активирует повторную отправку после окончания таймера', async () => {
      await page.clock.fastForward(otpData.retryDelay - 3_000);

      await expect(retryButton).toHaveText('Отправить код повторно');
      await expect(retryButton).toBeEnabled();
    });
  });

  test('Войти. Отправить код повторно', async ({ page, mount }) => {
    const { otpData } = await setupTest(
      { page, mount },
      { caseId: CASE_IDS.OTP_RETRY, clock: true }
    );

    await page.clock.fastForward(otpData.retryDelay);

    const retryButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.RETRY);
    const submitButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT);

    const [, retryResponse] = await Promise.all([
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
      expect(retryButton).toBeDisabled(),
      retryButton.click()
    ]);
    const retryData = (await retryResponse.json()) as CreateOtpResponse;

    await expect(retryButton).toContainText(String(retryData.retryDelay / 1000));
    await expect(retryButton).toBeDisabled();
  });

  test('Назад. Сброс OTP', async ({ page, mount }) => {
    await setupTest({ page, mount }, { caseId: CASE_IDS.OTP_BACK_RESET });

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill(VALID_OTP);
    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.BACK).click();

    await Promise.all([
      waitResponse(page, {
        path: '/api/tester/otps/otp',
        method: 'POST',
        status: HTTP_CODES.OK,
        body: { success: true }
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
    ]);

    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP)).toHaveValue('');
  });
});
