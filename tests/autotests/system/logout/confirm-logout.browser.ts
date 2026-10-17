import type { Page } from '@playwright/test';

import { expect, test } from '@playwright/test';
import { cookie, snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';
import { randomUUID } from 'node:crypto';

import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { testCase } from '../../../utils/helpers';
import { CASE_IDS } from './(helpers)';

const setupTest = async (page: Page, { caseId }: { caseId: string }) => {
  await testCase(page, caseId);
  await cookie.setItem(page, 'token', randomUUID(), {
    domain: 'localhost',
    path: '/'
  });

  await Promise.all([
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
    waitResponse(page, {
      path: '/api/tester/games/orders',
      method: 'GET',
      status: HTTP_CODES.OK
    }),
    page.goto('./profile')
  ]);

  await expect(page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`)).toBeVisible();
};

test.describe('Системное. Подтверждение выхода', () => {
  test('Дизайн', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.LOGOUT_DESIGN });
    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`).click();
    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();

    await snapshot(page, 'design');
  });

  test('Отмена', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.LOGOUT_CANCEL });
    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`).click();
    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();

    await page.getByTestId(TESTIDS.CLICKABLE.BUTTON.CANCEL).click();

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeHidden();
  });

  test('Кнопка закрытия', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('mobile'), 'На мобильном дизайне нет кнопки закрытия');

    await setupTest(page, { caseId: CASE_IDS.LOGOUT_CLOSE });
    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`).click();
    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeHidden();
  });

  test('Выйти. Лоадер', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.LOGOUT_LOADING });
    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`).click();
    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();

    const logoutButton = page.getByTestId(TESTIDS.CLICKABLE.BUTTON.LOGOUT);
    const signOutResponse = waitResponse(page, {
      path: '/api/tester/auth/sign-out',
      method: 'POST',
      status: HTTP_CODES.OK,
      body: { success: true }
    });

    await Promise.all([
      waitRequest(page, {
        path: '/api/tester/auth/sign-out',
        method: 'POST'
      }),
      logoutButton.click()
    ]);

    await expect(page.getByTestId(TESTIDS.CLICKABLE.BUTTON.CANCEL)).toBeDisabled();
    await expect(logoutButton).toBeDisabled();
    await expect(logoutButton.locator('svg')).toBeVisible();

    await signOutResponse;
  });

  test('Выйти. Успех', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.LOGOUT_SUCCESS });
    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`).click();
    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();

    await Promise.all([
      waitRequest(page, {
        path: '/api/tester/auth/sign-out',
        method: 'POST'
      }),
      waitResponse(page, {
        path: '/api/tester/auth/sign-out',
        method: 'POST',
        status: HTTP_CODES.OK,
        body: { success: true }
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.LOGOUT).click()
    ]);

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeHidden();
    await expect(page).toHaveURL('./');
  });

  test('Выйти. Ошибка', async ({ page }) => {
    await setupTest(page, { caseId: CASE_IDS.LOGOUT_ERROR });
    await page.getByTestId(`${TESTIDS.CLICKABLE.BUTTON.LOGOUT}-profile`).click();
    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();

    await Promise.all([
      waitRequest(page, {
        path: '/api/tester/auth/sign-out',
        method: 'POST'
      }),
      waitResponse(page, {
        path: '/api/tester/auth/sign-out',
        method: 'POST',
        status: HTTP_CODES.OK,
        body: { success: false }
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.LOGOUT).click()
    ]);

    await expect(page.getByTestId(TESTIDS.STATIC.MODAL.LOGOUT)).toBeVisible();
  });
});
