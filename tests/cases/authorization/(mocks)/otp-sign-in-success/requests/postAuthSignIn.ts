import { rest } from 'mock-config-server';

import type { SignInDto, SignInResponse, User } from '@/generated/api';

import { VALID_OTP, VALID_PHONE } from '../../../(helpers)';
import { COOKIE_KEYS } from '../../../../../utils/constants';
import { AUTHORIZATION_TOKEN, CASE_ID } from '../constants';

const AUTHORIZATION_USER: User = {
  _id: 'authorization-user-id',
  phone: VALID_PHONE,
  firstname: 'Tester',
  lastname: 'Authorization'
};

export const postAuthSignIn = rest.post<{
  body: SignInDto;
  response: SignInResponse;
}>('/auth/sign-in', {
  match: {
    cookies: {
      [COOKIE_KEYS.TEST_CASE]: CASE_ID
    },
    body: {
      phone: VALID_PHONE,
      code: Number(VALID_OTP)
    }
  },
  handler: ({ setCookie }) => {
    setCookie('token', AUTHORIZATION_TOKEN, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax'
    });

    return {
      success: true,
      token: AUTHORIZATION_TOKEN,
      user: AUTHORIZATION_USER
    };
  }
});
