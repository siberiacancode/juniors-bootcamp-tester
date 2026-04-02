import { queryOptions } from '@tanstack/react-query';

import type { Game } from '@/generated/api';

import { gamesControllerGetGames } from '@/generated/api';

export const gamesQueryOptions = queryOptions<Game[]>({
  queryKey: ['games'],
  queryFn: async () => {
    const res = await gamesControllerGetGames({});
    return res.data.data;
  }
});
