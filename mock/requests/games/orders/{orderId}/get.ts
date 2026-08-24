import { fn, rest } from 'mock-config-server';

import type { GameOrderResponse, GamesControllerGetGameOrderData } from '@/generated/api';

import { db } from '../../../../database';

export const getGamesOrderByOrderId = [
  rest.get<{
    response: GameOrderResponse;
    query: { token?: string };
    params: GamesControllerGetGameOrderData['path'];
  }>('/games/orders/:orderId', {
    match: {
      params: {
        orderId: 'paid'
      },
      queries: {
        token: fn((token) => db.hasOrderByPaidToken(String(token)))
      }
    },
    handler: ({ request }) => ({
      success: true,
      order: db.getOrderByPaidToken(String(request.query!.token))!
    })
  }),
  rest.get<{
    response: GameOrderResponse;
    params: GamesControllerGetGameOrderData['path'];
  }>(
    '/games/orders/:orderId',
    {
      match: {
        params: {
          orderId: 'paid'
        }
      },
      response: {
        success: false,
        reason: 'Оплаченный заказ не найден'
      }
    },
    { status: 404 }
  ),
  rest.get<{
    response: GameOrderResponse;
    params: GamesControllerGetGameOrderData['path'];
  }>('/games/orders/:orderId', {
    match: {
      params: {
        orderId: fn((orderId) => Boolean(db.getPaidOrder(String(orderId))))
      }
    },
    handler: ({ request }) => ({
      success: true,
      order: db.getPaidOrder(request.params.orderId)!
    })
  }),
  rest.get<{
    response: GameOrderResponse;
    params: GamesControllerGetGameOrderData['path'];
  }>(
    '/games/orders/:orderId',
    {
      success: false,
      reason: 'Заказ не найден'
    },
    { status: 404 }
  )
];
