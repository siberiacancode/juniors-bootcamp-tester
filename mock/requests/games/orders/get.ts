import { fn, rest } from 'mock-config-server';

import type { GameOrdersResponse } from '@/generated/api';

import { db } from '../../../database';

export const getGamesOrders = [
  rest.get<{
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
          [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777772')
        }
      }
    }
  ),
  rest.get<{
    response: GameOrdersResponse;
  }>(
    '/games/orders',
    () => ({
      success: true,
      orders: db.getOrders()
    }),
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)!.phone))
        }
      }
    }
  ),
  rest.get(
    '/games/orders',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
