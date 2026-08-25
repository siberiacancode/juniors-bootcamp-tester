import { rest } from 'mock-config-server';

import type { GamesControllerSearchGamesData, GameSearchResponse } from '@/generated/api';

import { db } from '../../../database';

export const getGamesSearch = rest.get<{
  query: GamesControllerSearchGamesData['query'];
  response: GameSearchResponse;
}>('/games/search', ({ request }) => {
  const { search = '', limit = 10 } = request.query ?? {};
  const normalizedSearch = String(search).trim().toLowerCase();

  const games = db
    .getGames()
    .filter((game) => game.detailed.name.toLowerCase().includes(normalizedSearch))
    .slice(0, Number(limit))
    .map((game) => ({
      slug: game.detailed.slug,
      name: game.detailed.name,
      releaseDate: game.detailed.releaseDate,
      type: game.detailed.type,
      genres: game.detailed.genres,
      image: game.detailed.image,
      priceVariant: db.getCheapestGameVariant(game.priceVariants)
    }));

  return {
    success: true,
    games
  };
});
