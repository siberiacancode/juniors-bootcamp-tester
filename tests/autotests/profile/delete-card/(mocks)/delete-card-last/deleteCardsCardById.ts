import { rest } from 'mock-config-server';

import type { CardsControllerDeleteCardData, DeleteCardResponse } from '@/generated/api';

import { createDeleteCardResponseFake } from '@/generated/api';

import { deleteLastCard as deleteLastCardFromState } from './getCardsCards';

export const deleteLastCard = rest.delete<{
  params: CardsControllerDeleteCardData['path'];
  response: DeleteCardResponse;
}>('/cards/cards/:id', ({ getCookie, request }) => {
  deleteLastCardFromState(getCookie('token') ?? '');

  return createDeleteCardResponseFake({
    id: request.params.id
  });
});
