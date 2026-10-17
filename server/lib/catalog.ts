import process from 'node:process';

import type {
  GameFilter,
  GameGenre,
  GamesControllerGetGamesData,
  GameView
} from '../../generated/api/types.gen';

export const DEFAULT_BACKEND_URL = 'http://localhost:3010/api/tester';

const toNumber = (value: string | null) => {
  if (value === null) return undefined;

  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
};

export const getBackendUrl = () => process.env.BACKEND_URL ?? DEFAULT_BACKEND_URL;

export const parseCatalogQuery = (
  searchParams: URLSearchParams
): NonNullable<GamesControllerGetGamesData['query']> => ({
  filter: searchParams.getAll('filter') as GameFilter[],
  genre: searchParams.getAll('genre') as GameGenre[],
  limit: toNumber(searchParams.get('limit')),
  page: toNumber(searchParams.get('page')),
  view: (searchParams.get('view') as GameView | null) ?? undefined
});

export const getGameImageUrl = (image: string) =>
  new URL(`/api${image}`, getBackendUrl()).toString();
