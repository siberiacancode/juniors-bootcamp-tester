import { fn, rest } from 'mock-config-server';

import type { GameResponse, GamesControllerGetGameData } from '@/generated/api';

import { db } from '../../../../database';

export const getGamesInfoBySlug = [
  rest.get<{
    response: GameResponse;
    params: GamesControllerGetGameData['path'];
  }>(
    '/games/info/:slug',
    ({ request }) => ({
      success: true,
      game: db.getGame(request.params.slug)!.detailed
    }),
    {
      match: {
        params: {
          slug: fn((slug) => Boolean(db.getGame(String(slug))))
        }
      }
    }
  ),
  rest.get(
    '/games/info/:slug',
    {
      success: false,
      reason: 'Игра не найдена'
    },
    { status: 404 }
  )
];
