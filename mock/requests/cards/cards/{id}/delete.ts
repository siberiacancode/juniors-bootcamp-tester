import { fn, rest } from 'mock-config-server';

import type { CardsControllerDeleteCardData, DeleteCardResponse } from '@/generated/api';

import { db } from '../../../../database';

export const deleteCardsCardById = [
  rest.delete(
    '/cards/cards/:id',
    () => ({
      success: false,
      reason: 'Не удалось удалить карту'
    }),
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777773')
        }
      },
      status: 400
    }
  ),
  rest.delete<{
    response: DeleteCardResponse;
    params: CardsControllerDeleteCardData['path'];
  }>(
    '/cards/cards/:id',
    ({ request }) => {
      db.deleteCard(request.params.id);
      return {
        success: true,
        id: request.params.id
      };
    },
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => Boolean(db.getUserByToken(token)))
        }
      }
    }
  ),
  rest.delete(
    '/cards/cards/:id',
    {
      success: false,
      reason: 'Не авторизован'
    },
    { status: 401 }
  )
];
