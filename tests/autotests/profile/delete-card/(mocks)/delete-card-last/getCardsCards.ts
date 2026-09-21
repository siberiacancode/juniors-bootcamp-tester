import { rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { createCardFake, createGetCardsResponseFake } from '@/generated/api';

const deletedTokens = new Set<string>();
const lastCard = createCardFake();

export const deleteLastCard = (token: string) => {
  deletedTokens.add(token);
};

export const getCardsCards = rest.get<{
  response: GetCardsResponse;
}>('/cards/cards', ({ getCookie }) =>
  createGetCardsResponseFake({
    cards: deletedTokens.has(getCookie('token') ?? '') ? [] : [lastCard]
  })
);
