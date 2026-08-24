import { fn, rest } from 'mock-config-server';

import type { CreateGameOrderDto, CreateGameOrderResponse, GameOrder } from '@/generated/api';

import { GameOrderStatus } from '@/generated/api';

import { PLACEHOLDER_IMAGE } from '../../../constants';
import { db } from '../../../database';
import { faker } from '../../../faker';

export const postGamesOrder = [
  rest.post(
    '/games/order',
    {
      match: {
        cookies: {
          [db.tokenName]: fn((token) => db.getUserByToken(token)!.phone === '77777777776')
        }
      },
      response: {
        success: false,
        reason: 'Не удалось создать заказ'
      }
    },
    { status: 400 }
  ),
  rest.post(
    '/games/order',
    {
      match: {
        body: fn((body) => !db.getGame((body as CreateGameOrderDto).gameSlug))
      },
      response: {
        success: false,
        reason: 'Игра не найдена'
      }
    },
    { status: 404 }
  ),
  rest.post<{
    body: CreateGameOrderDto;
    response: CreateGameOrderResponse;
  }>('/games/order', {
    handler: ({ request }) => {
      const body = request.body;
      const game = db.getGame(body.gameSlug)!;
      const variant = game.priceVariants.find(
        (priceVariant) =>
          priceVariant.deliveryType === body.deliveryType &&
          priceVariant.region === body.region &&
          priceVariant.edition === body.edition
      )!;

      const draftOrder: GameOrder = {
        _id: faker.string.uuid(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        person: {
          phone: body.person.phone,
          email: body.person.email,
          ...(body.person.inviteLink && { inviteLink: body.person.inviteLink })
        },
        gameSlug: game.detailed.slug,
        gameName: game.detailed.name,
        gameImage: PLACEHOLDER_IMAGE,
        region: variant.region,
        price: variant.price,
        deliveryType: variant.deliveryType,
        edition: variant.edition,
        status: GameOrderStatus.AWAITING_PAYMENT,
        gameKey: null,
        transactionId: null
      };

      const { order, transaction } = db.createOrderWithTransaction(draftOrder);

      return {
        success: true,
        order,
        transaction
      };
    }
  })
];
