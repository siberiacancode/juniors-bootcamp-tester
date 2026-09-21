import { rest } from 'mock-config-server';

import type { SignInDto, SignInResponse } from '@/generated/api';

import { createSignInResponseFake } from '@/generated/api';

import { AUTHORIZATION_TOKEN, AUTHORIZATION_USER } from '../../(helpers)';

export const postAuthSignInSuccess = rest.post<{
  body: SignInDto;
  response: SignInResponse;
}>('/auth/sign-in', ({ setCookie }) => {
  setCookie('token', AUTHORIZATION_TOKEN, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax'
  });

  return createSignInResponseFake({
    token: AUTHORIZATION_TOKEN,
    user: AUTHORIZATION_USER
  });
});
