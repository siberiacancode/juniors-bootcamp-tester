import { useQuery } from '@tanstack/react-query';

import type { Game } from '@/generated/api';

import { gamesControllerGetGames } from '@/generated/api';

const getGamesInfoQuery = async (): Promise<Game[]> => {
  const res = await gamesControllerGetGames({});
  return res.data.data;
};

export const useGetGamesInfoQuery = () =>
  useQuery({
    queryKey: ['games'],
    queryFn: getGamesInfoQuery
  });
