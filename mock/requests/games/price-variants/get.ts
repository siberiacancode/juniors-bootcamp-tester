import { fn, rest } from 'mock-config-server';

import type {
  GamePriceVariantsResponse,
  GamesControllerGetPriceVariantsData
} from '@/generated/api';

import { db } from '../../../database';

export const getGamesPriceVariants = [
  rest.get<{
    queries: GamesControllerGetPriceVariantsData['query'];
    response: GamePriceVariantsResponse;
  }>(
    '/games/price-variants',
    ({ request }) => {
      const { slug, deliveryType, region } = request.query ?? {};
      const game = db.getGame(String(slug))!;

      const priceVariants = game.priceVariants.filter(
        (variant) => variant.deliveryType === deliveryType && variant.region === region
      );

      return {
        success: true,
        priceVariants
      };
    },
    {
      match: {
        queries: {
          slug: fn((slug) => Boolean(db.getGame(String(slug))))
        }
      }
    }
  ),
  rest.get(
    '/games/price-variants',
    {
      success: false,
      reason: 'Игра не найдена'
    },
    { status: 404 }
  )
];
