import type { Page } from '@playwright/test';

import { cookie, waitRequest, waitResponse } from '@siberiacancode/playwright';
import { http, HttpResponse } from 'msw';
import { randomUUID } from 'node:crypto';

import {
  createBaseResponseFake,
  createGameOrdersResponseFake,
  createGetCardsResponseFake,
  createGetProfileResponseFake
} from '@/generated/api';
import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { expect, test } from './fixtures.browser';

const setupTest = async (page: Page) => {
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

test('Выйти. Успех', async ({ network, page }) => {
  network.use(
    http.get('/api/tester/users/profile', () => HttpResponse.json(createGetProfileResponseFake())),
    http.get('/api/tester/cards/cards', () =>
      HttpResponse.json(createGetCardsResponseFake({ cards: [] }))
    ),
    http.get('/api/tester/games/orders', () =>
      HttpResponse.json(createGameOrdersResponseFake({ orders: [] }))
    ),
    http.post('/api/tester/auth/sign-out', () => HttpResponse.json(createBaseResponseFake()))
  );

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
