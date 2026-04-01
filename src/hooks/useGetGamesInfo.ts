import { useQuery } from '@tanstack/react-query';

import type { ApiListResponse, GameInfo } from '@/types/api';

import { BASE_URL } from '@/types/api';

const GAMES_QUERY_KEY = ['games'] as const;

const getGamesInfo = async (): Promise<GameInfo[]> => {
  const res = await fetch(`${BASE_URL}/games/info`);

  if (!res.ok) {
    throw new Error(`Failed to fetch`);
  }

  const json = (await res.json()) as ApiListResponse<GameInfo>;

  return json.data;
};

export const useGetGamesInfo = () =>
  useQuery({
    queryKey: GAMES_QUERY_KEY,
    queryFn: getGamesInfo
  });
