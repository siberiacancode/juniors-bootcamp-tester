import { rest } from 'mock-config-server';

import type { GameOrdersResponse } from '@/generated/api';

import { AUTHORIZATION_TOKEN } from '../../(helpers)';

export const getGamesOrdersSuccess = rest.get<{
  response: GameOrdersResponse;
}>(
  '/games/orders',
  {
    success: true,
    orders: []
  },
  {
    match: {
      cookies: {
        token: AUTHORIZATION_TOKEN
      }
    }
  }
);
