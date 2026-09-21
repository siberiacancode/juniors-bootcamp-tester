import { rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { createGetCardsResponseFake } from '@/generated/api';

export const getCardsCardsSuccess = rest.get<{
  response: GetCardsResponse;
}>(
  '/cards/cards',
  createGetCardsResponseFake({
    cards: []
  })
);
