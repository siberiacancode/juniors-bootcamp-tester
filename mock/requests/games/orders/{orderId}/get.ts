import { fn, rest } from 'mock-config-server';

import type { GameOrderResponse, GamesControllerGetGameOrderData } from '@/generated/api';

import { db } from '../../../../database';

export const getGamesOrderByOrderId = [
  rest.get<{
    response: GameOrderResponse;
    queries: { token?: string };
    params: GamesControllerGetGameOrderData['path'];
  }>(
    '/games/orders/:orderId',
    ({ request }) => ({
      success: true,
      order: db.getOrderByPaidToken(String(request.query!.token))!
    }),
    {
      match: {
        params: {
          orderId: 'paid'
        },
        queries: {
          token: fn((token) => db.hasOrderByPaidToken(String(token)))
        }
      }
    }
  ),
  rest.get(
    '/games/orders/:orderId',
    {
      success: false,
      reason: 'Оплаченный заказ не найден'
    },
    {
      match: {
        params: {
          orderId: 'paid'
        }
      },
      status: 404
    }
  ),
  rest.get<{
    response: GameOrderResponse;
    params: GamesControllerGetGameOrderData['path'];
  }>(
    '/games/orders/:orderId',
    ({ request }) => ({
      success: true,
      order: db.getPaidOrder(request.params.orderId)!
    }),
    {
      match: {
        params: {
          orderId: fn((orderId) => Boolean(db.getPaidOrder(String(orderId))))
        }
      }
    }
  ),
  rest.get(
    '/games/orders/:orderId',
    {
      success: false,
      reason: 'Заказ не найден'
    },
    { status: 404 }
  )
];
