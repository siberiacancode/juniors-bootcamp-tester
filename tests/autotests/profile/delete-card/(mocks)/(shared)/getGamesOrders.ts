import { rest } from 'mock-config-server';

import type { GameOrdersResponse } from '@/generated/api';

import { createGameOrdersResponseFake } from '@/generated/api';

export const getGamesOrdersSuccess = rest.get<{
  response: GameOrdersResponse;
}>(
  '/games/orders',
  createGameOrdersResponseFake({
    orders: []
  })
);
