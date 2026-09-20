import { fn, rest } from 'mock-config-server';

import type { SignInDto, SignInResponse } from '@/generated/api';

import { db } from '../../../database';

export const postAuthSignIn = [
  rest.post<{
    body: SignInDto;
    response: SignInResponse;
  }>(
    '/auth/sign-in',
    ({ request, setCookie }) => {
      const { phone } = request.body;
      const token = db.createAuthToken(phone);
      const user = db.getUser(phone)!;

      setCookie(db.tokenName, token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
      });

      return {
        success: true,
        token,
        user
      };
    },
    {
      match: {
        body: fn<SignInDto>((data) => Boolean(db.getUser(data.phone)))
      }
    }
  ),
  rest.post('/auth/sign-in', {
    success: false,
    reason: 'Пользователь с таким номером не найден'
  })
];
