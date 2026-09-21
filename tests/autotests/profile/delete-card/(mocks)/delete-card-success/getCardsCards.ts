import { rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { createGetCardsResponseFake } from '@/generated/api';

import { getCardsCardsSuccessResponse } from '../(shared)';

const deletedCardIds = new Map<string, string>();

export const deleteCard = (token: string, cardId: string) => {
  deletedCardIds.set(token, cardId);
};

export const getCardsCards = rest.get<{
  response: GetCardsResponse;
}>('/cards/cards', ({ getCookie }) =>
  createGetCardsResponseFake({
    cards: getCardsCardsSuccessResponse.cards.filter(
      (card) => card._id !== deletedCardIds.get(getCookie('token') ?? '')
    )
  })
);
