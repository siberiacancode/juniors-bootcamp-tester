import { rest } from 'mock-config-server';

import type { CardsControllerDeleteCardData, DeleteCardResponse } from '@/generated/api';

import { createDeleteCardResponseFake } from '@/generated/api';

import { deleteCard } from './getCardsCards';

export const deleteCardsCardByIdSuccess = rest.delete<{
  params: CardsControllerDeleteCardData['path'];
  response: DeleteCardResponse;
}>('/cards/cards/:id', ({ getCookie, request }) => {
  deleteCard(getCookie('token') ?? '', request.params.id);

  return createDeleteCardResponseFake({
    id: request.params.id
  });
});
