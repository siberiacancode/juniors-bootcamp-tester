import { fn, rest } from 'mock-config-server';

import type { GameOrdersResponse } from '@/generated/api';

import { db } from '../../../database';

export const getGamesOrders = [
  rest.get<{
    response: GameOrdersResponse;
  }>('/games/orders', {
    match: {
      cookies: {
        [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777772')
      }
    },
    handler: () => ({
      success: true,
      orders: []
    })
  }),
  rest.get<{
    response: GameOrdersResponse;
  }>('/games/orders', {
    match: {
      cookies: {
        [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)!.phone))
      }
    },
    handler: () => ({
      success: true,
      orders: db.getOrders()
    })
  }),
  rest.get<{
    response: GameOrdersResponse;
  }>(
    '/games/orders',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
