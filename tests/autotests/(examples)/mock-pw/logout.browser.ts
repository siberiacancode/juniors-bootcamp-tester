import type { Page } from '@playwright/test';

import { expect, test } from '@playwright/test';
import { cookie, waitRequest, waitResponse } from '@siberiacancode/playwright';
import { randomUUID } from 'node:crypto';

import {
  createBaseResponseFake,
  createGameOrdersResponseFake,
  createGetCardsResponseFake,
  createGetProfileResponseFake
} from '@/generated/api';
import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';

const setupTest = async (page: Page) => {
  await Promise.all([
    page.route('**/api/tester/users/profile', (route) =>
      route.fulfill({
        json: createGetProfileResponseFake()
      })
    ),
    page.route('**/api/tester/cards/cards', (route) =>
      route.fulfill({
        json: createGetCardsResponseFake({ cards: [] })
      })
    ),
    page.route('**/api/tester/games/orders', (route) =>
      route.fulfill({
        json: createGameOrdersResponseFake({ orders: [] })
      })
    ),
    page.route('**/api/tester/auth/sign-out', (route) =>
      route.fulfill({
        json: createBaseResponseFake()
      })
    )
  ]);

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

test('Выйти. Успех', async ({ page }) => {
  await setupTest(page);
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
