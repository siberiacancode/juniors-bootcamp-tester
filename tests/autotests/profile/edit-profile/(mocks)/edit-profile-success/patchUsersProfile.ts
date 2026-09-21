import { rest } from 'mock-config-server';

import type { UpdateProfileDto, UpdateProfileResponse } from '@/generated/api';

import {
  AUTHORIZATION_TOKEN,
  PROFILE_UPDATED_COOKIE,
  UPDATED_PROFILE,
  UPDATED_USER
} from '../../(helpers)';

export const patchUsersProfile = rest.patch<{
  body: UpdateProfileDto;
  response: UpdateProfileResponse;
}>(
  '/users/profile',
  ({ setCookie }) => {
    setCookie(PROFILE_UPDATED_COOKIE, 'true', { path: '/' });

    return {
      success: true,
      user: UPDATED_USER
    };
  },
  {
    delay: 3_000,
    match: {
      cookies: {
        token: AUTHORIZATION_TOKEN
      },
      body: UPDATED_PROFILE
    }
  }
);
