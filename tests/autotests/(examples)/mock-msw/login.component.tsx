import { waitRequest, waitResponse } from '@siberiacancode/playwright';
import { delay, http, HttpResponse } from 'msw';

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
import { expect, test } from './fixtures.component';

type SetupTestFixtures = Parameters<ComponentSetupTest<never>>[0];

const user = createUserFake({ phone: VALID_PHONE });

const setupTest = async ({ page, mount }: SetupTestFixtures) => {
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

test('Войти. Успех', async ({ network, page, mount }) => {
  network.use(
    http.post('/api/tester/otps/otp', () =>
      HttpResponse.json(createCreateOtpResponseFake({ retryDelay: 30_000 }))
    ),
    http.post('/api/tester/auth/sign-in', async () => {
      await delay(250);

      return HttpResponse.json(createSignInResponseFake({ user }));
    }),
    http.get('/api/tester/users/profile', () =>
      HttpResponse.json(createGetProfileResponseFake({ user }))
    ),
    http.get('/api/tester/cards/cards', () =>
      HttpResponse.json(createGetCardsResponseFake({ cards: [] }))
    )
  );

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
