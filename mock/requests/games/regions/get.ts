import { fn, rest } from 'mock-config-server';

import type { GameRegionsResponse, GamesControllerGetGameRegionsData } from '@/generated/api';

import { db } from '../../../database';

export const getGamesRegions = [
  rest.get<{
    queries: GamesControllerGetGameRegionsData['query'];
    response: GameRegionsResponse;
  }>(
    '/games/regions',
    ({ request }) => {
      const { slug, deliveryType } = request.query ?? {};
      const game = db.getGame(String(slug ?? ''))!;

      const regions = [
        ...new Set(
          game.priceVariants
            .filter((variant) => variant.deliveryType === deliveryType)
            .map((variant) => variant.region)
        )
      ];

      return {
        success: true,
        regions
      };
    },
    {
      match: {
        queries: {
          slug: fn((slug) => Boolean(db.getGame(String(slug ?? ''))))
        }
      }
    }
  ),
  rest.get(
    '/games/regions',
    {
      success: false,
      reason: 'Игра не найдена'
    },
    { status: 404 }
  )
];
