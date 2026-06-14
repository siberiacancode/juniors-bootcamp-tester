import type { FilteredGame, GameGenre } from '@/generated/api';

import { formatMoney } from '@/helpers/utils';

import type { CatalogView } from '../-constants/catalog';

export interface CatalogFilters {
  genre: GameGenre[];
  q: string;
  showDlc: boolean;
  view: CatalogView;
  withDiscount: boolean;
}

export const formatCatalogPrice = (price: number): string => formatMoney(price);

export const getDiscountPercent = (game: FilteredGame): number | null => {
  const { oldPrice, price } = game.priceVariant;

  if (!oldPrice || oldPrice <= price) {
    return null;
  }

  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

export const filterCatalogGames = (
  games: FilteredGame[],
  filters: CatalogFilters
): FilteredGame[] => {
  const normalizedQuery = filters.q.trim().toLocaleLowerCase('ru-RU');

  return games.filter((game) => {
    if (!filters.showDlc && game.type === 'dlc') {
      return false;
    }

    if (filters.withDiscount && !game.priceVariant.oldPrice) {
      return false;
    }

    if (filters.genre.length > 0 && !filters.genre.some((genre) => game.genres.includes(genre))) {
      return false;
    }

    if (normalizedQuery && !game.name.toLocaleLowerCase('ru-RU').includes(normalizedQuery)) {
      return false;
    }

    return true;
  });
};

export const filterGenresByQuery = (
  genres: GameGenre[],
  labels: Record<GameGenre, string>,
  query: string
): GameGenre[] => {
  const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU');

  if (!normalizedQuery) {
    return genres;
  }

  return genres.filter((genre) =>
    labels[genre].toLocaleLowerCase('ru-RU').includes(normalizedQuery)
  );
};

export { getGameImageSrc } from '@/helpers/utils';
