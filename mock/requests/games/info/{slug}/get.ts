import { fn, rest } from 'mock-config-server';

import type { GameResponse, GamesControllerGetGameData } from '@/generated/api';

import { db } from '../../../../database';

export const getGamesInfoBySlug = [
  rest.get<{
    response: GameResponse;
    params: GamesControllerGetGameData['path'];
  }>('/games/info/:slug', {
    match: {
      params: {
        slug: fn((slug) => Boolean(db.getGame(String(slug))))
      }
    },
    handler: ({ request }) => ({
      success: true,
      game: db.getGame(request.params.slug)!.detailed
    })
  }),
  rest.get<{
    response: GameResponse;
    params: GamesControllerGetGameData['path'];
  }>(
    '/games/info/:slug',
    {
      success: false,
      reason: 'Игра не найдена'
    },
    { status: 404 }
  )
];
