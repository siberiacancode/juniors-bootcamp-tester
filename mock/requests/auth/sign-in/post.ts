import { fn, rest } from 'mock-config-server';

import type { SignInDto, SignInResponse } from '@/generated/api';

import { db } from '../../../database';

export const postAuthSignIn = [
  rest.post<{
    body: SignInDto;
    response: SignInResponse;
  }>('/auth/sign-in', {
    match: {
      body: fn((data) => Object.keys(USERS).includes(data.phone))
      // bug
      // body: {
      //   phone: oneOf(...Object.keys(USERS).map(equals))
      // }
    },
    handler: ({ request, setCookie }) => {
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
    }
  }),
  rest.post<{
    body: SignInDto;
    response: SignInResponse;
  }>('/auth/sign-in', {
    success: false,
    reason: 'Пользователь с таким номером не найден'
  })
];
