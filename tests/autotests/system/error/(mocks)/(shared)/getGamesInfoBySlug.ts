import { rest } from 'mock-config-server';

import type { ErrorResponse, GamesControllerGetGameData } from '@/generated/api';

export const getGamesInfoBySlugError = rest.get<{
  response: ErrorResponse;
  params: GamesControllerGetGameData['path'];
}>(
  '/games/info/:slug',
  {
    success: false,
    reason: 'Internal Server Error'
  },
  { status: 500 }
);
