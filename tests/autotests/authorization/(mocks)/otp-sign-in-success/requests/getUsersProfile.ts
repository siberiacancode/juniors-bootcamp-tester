import { rest } from 'mock-config-server';

import type { ErrorResponse, GetProfileResponse } from '@/generated/api';

import { VALID_PHONE } from '../../../(helpers)';
import { COOKIE_KEYS } from '../../../../../utils/constants';
import { AUTHORIZATION_TOKEN, CASE_ID } from '../constants';

export const getUsersProfile = [
  rest.get<{
    response: GetProfileResponse;
  }>('/users/profile', {
    match: {
      cookies: {
        [COOKIE_KEYS.TEST_CASE]: CASE_ID,
        token: AUTHORIZATION_TOKEN
      }
    },
    response: {
      success: true,
      user: {
        _id: 'authorization-user-id',
        phone: VALID_PHONE,
        firstname: 'Tester',
        lastname: 'Authorization'
      }
    }
  }),
  rest.get<{
    response: ErrorResponse;
  }>(
    '/users/profile',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
