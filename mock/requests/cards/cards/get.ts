import { fn, rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { db } from '../../../database';

export const getCardsCards = [
  rest.get<{
    response: GetCardsResponse;
  }>(
    '/cards/cards',
    {
      success: true,
      cards: []
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
    response: GetCardsResponse;
  }>(
    '/cards/cards',
    () => ({
      success: true,
      cards: db.getCards()
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
    '/cards/cards',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
