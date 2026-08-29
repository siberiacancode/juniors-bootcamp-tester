import { rest } from 'mock-config-server';

import type { GamesControllerGetGamesData, GamesPaginatedResponse } from '@/generated/api';

import { GameFilter, GameType } from '@/generated/api';

import { db } from '../../../database';

export const getGamesInfo = rest.get<{
  query: GamesControllerGetGamesData['query'];
  response: GamesPaginatedResponse;
}>('/games/info', ({ request }) => {
  const query = request.query ?? {};

  const filters = ([] as string[]).concat(query.filter ?? []);
  const genres = ([] as string[]).concat(query.genre ?? []);
  const page = Number(query.page ?? 1);
  const limit = Number(query.limit ?? 12);

  let games = [...db.getGames()];

  if (genres.length) {
    games = games.filter((game) => game.detailed.genres.some((genre) => genres.includes(genre)));
  }

  if (filters.includes(GameFilter.DLC)) {
    games = games.filter((game) => game.detailed.type === GameType.DLC);
  }

  if (filters.includes(GameFilter.DISCOUNT)) {
    games = games.filter((game) =>
      game.priceVariants.some((variant) => typeof variant.oldPrice === 'number')
    );
  }

  if (query.view === 'new') {
    games = [...games].sort((a, b) => b.detailed.releaseDate - a.detailed.releaseDate);
  } else if (query.view === 'popular') {
    games = [...games].sort(
      (a, b) =>
        db.getCheapestGameVariant(a.priceVariants).price -
        db.getCheapestGameVariant(b.priceVariants).price
    );
  }

  const total = games.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const pageGames = games.slice(start, start + limit).map((game) => ({
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
    games: pageGames,
    meta: { total, page, limit, totalPages }
  };
});
