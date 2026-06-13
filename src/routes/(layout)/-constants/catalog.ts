import type { GameGenre, GameView } from '@/shared/api/generated';

export type CatalogView = 'all' | GameView;

export const CATALOG_GENRES = [
  'action',
  'adventure',
  'rpg',
  'strategy',
  'shooter',
  'simulation',
  'survival',
  'sports',
  'racing',
  'indie',
  'horror'
] as const satisfies GameGenre[];

export const CATALOG_VIEWS = [
  {
    label: 'Весь каталог',
    value: 'all'
  },
  {
    label: 'Новинки',
    value: 'new'
  },
  {
    label: 'Популярные',
    value: 'popular'
  }
] as const satisfies Array<{
  label: string;
  value: CatalogView;
}>;

export const CATALOG_GENRE_LABELS: Record<GameGenre, string> = {
  action: 'Экшены',
  adventure: 'Приключенческие игры',
  rpg: 'Ролевые игры',
  strategy: 'Стратегии',
  shooter: 'Шутеры',
  simulation: 'Симуляторы',
  survival: 'Выживание',
  sports: 'Спортивные игры',
  racing: 'Гонки',
  indie: 'Инди',
  horror: 'Хорроры'
};
