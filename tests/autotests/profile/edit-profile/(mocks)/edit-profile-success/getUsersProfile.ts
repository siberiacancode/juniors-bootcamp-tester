import { rest } from 'mock-config-server';

import type { GetProfileResponse } from '@/generated/api';

import { AUTHORIZATION_TOKEN, PROFILE_UPDATED_COOKIE, UPDATED_USER } from '../../(helpers)';

export const getUsersProfile = rest.get<{
  response: GetProfileResponse;
}>(
  '/users/profile',
  {
    success: true,
    user: UPDATED_USER
  },
  {
    match: {
      cookies: {
        token: AUTHORIZATION_TOKEN,
        [PROFILE_UPDATED_COOKIE]: 'true'
      }
    }
  }
);
