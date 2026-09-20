import { fn, rest } from 'mock-config-server';

import type { ErrorResponse, UpdateProfileDto, UpdateProfileResponse } from '@/generated/api';

import { db } from '../../../database';

export const patchUsersProfile = [
  rest.patch<{
    body: UpdateProfileDto;
    response: ErrorResponse;
  }>(
    '/users/profile',
    {
      success: false,
      reason: 'Редактирование профиля недоступно'
    },
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777771')
        }
      },
      status: 400
    }
  ),
  rest.patch<{
    body: UpdateProfileDto;
    response: UpdateProfileResponse;
  }>(
    '/users/profile',
    ({ getCookie, request }) => {
      const user = db.getUserByToken(getCookie(db.tokenName))!;
      return {
        success: true,
        user: db.updateProfile(user.phone, request.body)!
      };
    },
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)))
        }
      }
    }
  ),
  rest.patch(
    '/users/profile',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
