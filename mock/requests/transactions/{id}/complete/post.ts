import { fn, rest } from 'mock-config-server';

import type { GameOrder } from '@/generated/api';

import { db } from '../../../../database';

interface CompletePaymentResponse {
  order: GameOrder | null;
  reason?: string;
  success: boolean;
  token: string;
}

export const postTransactionComplete = [
  rest.post<{
    response: CompletePaymentResponse;
    body: { cardId?: string; panmask?: string; paymentMethod?: string };
    params: { id: string };
  }>('/transactions/:id/complete', {
    match: {
      params: {
        id: fn((id) => Boolean(db.getTransaction(String(id))))
      }
    },
    handler: ({ request }) => {
      const result = db.completePaymentByTransaction(request.params.id)!;

      return {
        success: true,
        order: result.order,
        token: result.token
      };
    }
  }),
  rest.post<{
    response: CompletePaymentResponse;
    body: { cardId?: string; panmask?: string; paymentMethod?: string };
    params: { id: string };
  }>(
    '/transactions/:id/complete',
    {
      success: false,
      reason: 'Транзакция не найдена'
    },
    { status: 404 }
  )
];
