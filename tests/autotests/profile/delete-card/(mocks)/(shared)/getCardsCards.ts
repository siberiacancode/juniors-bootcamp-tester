import { rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { createCardFake, createGetCardsResponseFake } from '@/generated/api';

export const getCardsCardsSuccessResponse = createGetCardsResponseFake({
  cards: Array.from({ length: 4 }, createCardFake)
});

export const getCardsCardsSuccess = rest.get<{
  response: GetCardsResponse;
}>('/cards/cards', getCardsCardsSuccessResponse);
