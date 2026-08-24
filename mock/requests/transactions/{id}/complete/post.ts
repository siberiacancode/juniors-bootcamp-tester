import { fn, rest } from 'mock-config-server';

import type { TransactionsControllerGetTransactionData } from '@/generated/api';

import { db } from '../../../../database';

export const postTransactionComplete = [
  rest.post('/transactions/:id/complete', {
    match: {
      params: {
        id: fn((id) => Boolean(db.getTransaction(String(id))))
      }
    },
    handler: ({ request }) => {
      const { id } = request.params as TransactionsControllerGetTransactionData['path'];
      const result = db.completePaymentByTransaction(id)!;

      return {
        success: true,
        order: result.order,
        token: result.token
      };
    }
  }),
  rest.post(
    '/transactions/:id/complete',
    {
      success: false,
      reason: 'Транзакция не найдена'
    },
    { status: 404 }
  )
];
