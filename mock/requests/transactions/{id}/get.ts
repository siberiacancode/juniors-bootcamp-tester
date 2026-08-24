import { fn, rest } from 'mock-config-server';

import type {
  GetTransactionResponse,
  TransactionsControllerGetTransactionData
} from '@/generated/api';

import { db } from '../../../database';

export const getTransactionById = [
  rest.get<{
    response: GetTransactionResponse;
    params: TransactionsControllerGetTransactionData['path'];
  }>('/transactions/:id', {
    match: {
      params: {
        id: fn((id) => Boolean(db.getTransaction(String(id))))
      }
    },
    handler: ({ request }) => ({
      success: true,
      transaction: db.getTransaction(request.params.id)!
    })
  }),
  rest.get<{
    response: GetTransactionResponse;
    params: TransactionsControllerGetTransactionData['path'];
  }>(
    '/transactions/:id',
    {
      success: false,
      reason: 'Транзакция не найдена'
    } as GetTransactionResponse,
    { status: 404 }
  )
];
