import { fn, rest } from 'mock-config-server';

import type { GetProfileResponse } from '@/generated/api';

import { db } from '../../../database';

export const getUsersProfile = [
  rest.get<{
    response: GetProfileResponse;
  }>(
    '/users/profile',
    ({ getCookie }) => ({
      success: true,
      user: db.getUserByToken(getCookie(db.tokenName))!
    }),
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)))
        }
      }
    }
  ),
  rest.get(
    '/users/profile',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
