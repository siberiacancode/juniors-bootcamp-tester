import { expect, test } from '@playwright/test';
import { snapshot, waitRequest, waitResponse } from '@siberiacancode/playwright';
import { ObjectId } from 'mongodb';

import type { CreateOtpDto, GetProfileResponse, SignInDto, User } from '../../generated/api';

import { TESTIDS } from '../../generated/tests/index.gen';
import { mongoDatabase } from '../utils';

test('Проверка логина', async ({ page }) => {
  const account = {
    phone: '79990000001',
    firstname: 'Иван',
    middlename: 'Иванович',
    lastname: 'Иванов',
    email: 'ivan.ivanov@example.com',
    city: 'Новосибирск'
  } satisfies Omit<User, '_id'>;
  const { insertedId } = await mongoDatabase.collection('users').insertOne(account);

  try {
    await page.goto('./login/');

    await expect(page.getByTestId(TESTIDS.STATIC.PAGE.LOGIN.SELF_ID)).toBeVisible();
    await snapshot(page, 'login');

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.PHONE).fill(account.phone);

    await Promise.all([
      waitRequest(page, {
        path: '/api/tester/otps/otp',
        method: 'POST',
        body: { phone: account.phone } satisfies CreateOtpDto
      }),
      waitResponse(page, {
        path: '/api/tester/otps/otp',
        method: 'POST',
        status: 200
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
    ]);

    await expect(page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP)).toBeVisible();
    await snapshot(page, 'login-otp', {
      mask: [page.getByTestId(TESTIDS.CLICKABLE.BUTTON.RETRY)]
    });

    const otp = await mongoDatabase.collection('otps').findOne({ phone: account.phone });

    await page.getByTestId(TESTIDS.CHANGEABLE.INPUT.OTP).fill(String(otp!.code));

    await Promise.all([
      waitRequest(page, {
        path: '/api/tester/auth/sign-in',
        method: 'POST',
        body: {
          code: otp!.code,
          phone: account.phone
        } satisfies SignInDto
      }),
      waitResponse(page, {
        path: '/api/tester/auth/sign-in',
        method: 'POST',
        status: 200
      }),
      waitResponse(page, {
        path: '/api/tester/users/profile',
        method: 'GET',
        status: 200
      }),
      waitResponse(page, {
        path: '/api/tester/cards/cards',
        method: 'GET',
        status: 200
      }),
      waitResponse(page, {
        path: '/api/tester/games/info',
        method: 'GET',
        status: 200
      }),
      page.getByTestId(TESTIDS.CLICKABLE.BUTTON.SUBMIT).click()
    ]);

    await expect(page).toHaveURL('./');

    const user = await mongoDatabase.collection('users').findOne({ phone: account.phone });
    expect(user).not.toBeNull();

    const session = await mongoDatabase.collection('sessions').findOne({ userId: user!._id });

    expect(session).not.toBeNull();
    expect(session!.userId).toBeInstanceOf(ObjectId);
    expect(session!.createdAt).toBeInstanceOf(Date);
    expect(session!.expiresAt).toBeInstanceOf(Date);
    expect(session!.userId.equals(user!._id)).toBe(true);
    expect(session!.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
    expect(session!.expiresAt.getTime()).toBeGreaterThan(Date.now());

    await snapshot(page, 'home');

    const [profileResponse] = await Promise.all([
      waitResponse(page, {
        path: '/api/tester/users/profile',
        method: 'GET',
        status: 200
      }),
      waitResponse(page, {
        path: '/api/tester/cards/cards',
        method: 'GET',
        status: 200
      }),
      waitResponse(page, {
        path: '/api/tester/games/orders',
        method: 'GET',
        status: 200
      }),
      page.goto('./profile/')
    ]);
    const profile = (await profileResponse.json()) as GetProfileResponse;

    expect(profile).toMatchObject({
      success: true,
      user: {
        _id: user!._id.toHexString(),
        city: user!.city,
        email: user!.email,
        firstname: user!.firstname,
        lastname: user!.lastname,
        middlename: user!.middlename,
        phone: user!.phone
      } satisfies User
    });

    await expect(page.getByTestId(TESTIDS.STATIC.TEXT.PROFILE_NAME)).toHaveText(
      [profile.user.lastname, profile.user.firstname, profile.user.middlename!].join(' ')
    );
    await expect(page.getByTestId(TESTIDS.STATIC.TEXT.PROFILE_EMAIL)).toHaveText(
      profile.user.email!
    );
    await expect(page.getByTestId(TESTIDS.STATIC.TEXT.PROFILE_PHONE)).toHaveText(
      `+${profile.user.phone.slice(0, 1)} ${profile.user.phone.slice(1, 4)} ${profile.user.phone.slice(4, 7)} ${profile.user.phone.slice(7, 9)} ${profile.user.phone.slice(9, 11)}`
    );

    await snapshot(page, 'profile');
  } finally {
    await Promise.all([
      mongoDatabase.collection('otps').deleteMany({ phone: account.phone }),
      mongoDatabase.collection('sessions').deleteMany({ insertedId }),
      mongoDatabase.collection('users').deleteOne({ _id: insertedId })
    ]);
  }
});
