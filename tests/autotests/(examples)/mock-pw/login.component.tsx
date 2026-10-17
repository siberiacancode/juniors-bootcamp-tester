import { expect, test } from '@playwright/experimental-ct-react';
import { waitRequest, waitResponse } from '@siberiacancode/playwright';
import { setTimeout as delay } from 'node:timers/promises';

import {
  createCreateOtpResponseFake,
  createGetCardsResponseFake,
  createGetProfileResponseFake,
  createSignInResponseFake,
  createUserFake
} from '@/generated/api';
import { TESTIDS } from '@/generated/tests/index.gen';

import { HTTP_CODES } from '../../../utils/constants';
import { VALID_OTP, VALID_PHONE } from '../../authorization/otp/(helpers)';
import { LoginPageWrapper } from '../../authorization/otp/(wrappers)';

type SetupTestFixtures = Parameters<ComponentSetupTest<never>>[0];

const setupTest = async ({ page, mount }: SetupTestFixtures) => {
  const user = createUserFake({ phone: VALID_PHONE });
  await Promise.all([
    page.route('**/api/tester/otps/otp', (route) =>
      route.fulfill({
        json: createCreateOtpResponseFake({ retryDelay: 30_000 })
      })
    ),
    page.route('**/api/tester/auth/sign-in', (route) =>
      delay(250).then(() =>
        route.fulfill({
          json: createSignInResponseFake({ user })
        })
      )
    ),
    page.route('**/api/tester/users/profile', (route) =>
      route.fulfill({
        json: createGetProfileResponseFake({ user })
      })
    ),
    page.route('**/api/tester/cards/cards', (route) =>
      route.fulfill({
        json: createGetCardsResponseFake({ cards: [] })
      })
    )
  ]);

  await mount<HooksConfig>(<LoginPageWrapper />, {
    hooksConfig: {
      routerConfig: {
        historyPath: '/login/',
        routePath: '/login/'
      }
    }
  });

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

test('Войти. Успех', async ({ page, mount }) => {
  await setupTest({ page, mount });

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

  await page.waitForURL((url) => url.pathname === '/');
});
