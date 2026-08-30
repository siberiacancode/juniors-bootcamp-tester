import { rest } from 'mock-config-server';

import type { ErrorResponse, SignInDto } from '@/generated/api';

import { COOKIE_KEYS } from '../../../../../utils/constants';
import { CASE_ID } from '../constants';

export const postAuthSignInInvalidCode = rest.post<{
  body: SignInDto;
  response: ErrorResponse;
}>(
  '/auth/sign-in',
  {
    match: {
      cookies: {
        [COOKIE_KEYS.TEST_CASE]: CASE_ID
      }
    },
    response: {
      success: false,
      reason: 'Неправильный отп код'
    }
  },
  { status: 400 }
);
