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
      match: {
        cookies: {
          [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777771')
        }
      },
      response: {
        success: false,
        reason: 'Редактирование профиля недоступно'
      }
    },
    { status: 400 }
  ),
  rest.patch<{
    body: UpdateProfileDto;
    response: UpdateProfileResponse;
  }>('/users/profile', {
    match: {
      cookies: {
        [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)))
      }
    },
    handler: ({ getCookie, request }) => {
      const user = db.getUserByToken(getCookie(db.tokenName))!;
      return {
        success: true,
        user: db.updateProfile(user.phone, request.body)!
      };
    }
  }),
  rest.patch(
    '/users/profile',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
