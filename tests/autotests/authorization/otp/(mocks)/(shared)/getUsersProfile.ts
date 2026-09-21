import { rest } from 'mock-config-server';

import type { ErrorResponse, GetProfileResponse } from '@/generated/api';

import { createErrorResponseFake, createGetProfileResponseFake } from '@/generated/api';

import { AUTHORIZATION_TOKEN, AUTHORIZATION_USER } from '../../(helpers)';

export const getUsersProfileSuccess = rest.get<{
  response: GetProfileResponse;
}>(
  '/users/profile',
  createGetProfileResponseFake({
    user: AUTHORIZATION_USER
  }),
  {
    match: {
      cookies: {
        token: AUTHORIZATION_TOKEN
      }
    }
  }
);

export const getUsersProfileUnauthorized = rest.get<{
  response: ErrorResponse;
}>('/users/profile', createErrorResponseFake(), {
  status: 401
});
