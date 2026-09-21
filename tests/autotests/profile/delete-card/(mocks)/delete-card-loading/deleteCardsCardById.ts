import { rest } from 'mock-config-server';

import type { CardsControllerDeleteCardData, DeleteCardResponse } from '@/generated/api';

import { createDeleteCardResponseFake } from '@/generated/api';

export const deleteCardsCardByIdLoading = rest.delete<{
  params: CardsControllerDeleteCardData['path'];
  response: DeleteCardResponse;
}>(
  '/cards/cards/:id',
  ({ request }) =>
    createDeleteCardResponseFake({
      id: request.params.id
    }),
  {
    delay: 3_000
  }
);
