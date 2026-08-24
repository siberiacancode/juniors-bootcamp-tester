import { fn, rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { db } from '../../../database';

export const getCardsCards = [
  rest.get<{
    response: GetCardsResponse;
  }>('/cards/cards', {
    match: {
      cookies: {
        [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777772')
      }
    },
    handler: () => ({
      success: true,
      cards: []
    })
  }),
  rest.get<{
    response: GetCardsResponse;
  }>('/cards/cards', {
    match: {
      cookies: {
        [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)!.phone))
      }
    },
    handler: () => ({
      success: true,
      cards: db.getCards()
    })
  }),
  rest.get<{
    response: GetCardsResponse;
  }>(
    '/cards/cards',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
