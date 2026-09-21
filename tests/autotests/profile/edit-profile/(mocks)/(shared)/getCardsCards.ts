import { rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { AUTHORIZATION_TOKEN } from '../../(helpers)';

export const getCardsCardsSuccess = rest.get<{
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
        token: AUTHORIZATION_TOKEN
      }
    }
  }
);
