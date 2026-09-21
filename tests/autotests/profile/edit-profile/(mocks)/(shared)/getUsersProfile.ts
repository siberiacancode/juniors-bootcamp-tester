import { rest } from 'mock-config-server';

import type { GetProfileResponse } from '@/generated/api';

import { AUTHORIZATION_TOKEN, INITIAL_USER } from '../../(helpers)';

export const getUsersProfileInitial = rest.get<{
  response: GetProfileResponse;
}>(
  '/users/profile',
  {
    success: true,
    user: INITIAL_USER
  },
  {
    match: {
      cookies: {
        token: AUTHORIZATION_TOKEN
      }
    }
  }
);
