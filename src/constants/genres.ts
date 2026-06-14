import type { GameGenre } from '@/generated/api';

export const GENRE_LABELS: Record<GameGenre, string> = {
  action: 'Экшены',
  adventure: 'Приключенческие игры',
  horror: 'Ужасы',
  indie: 'Инди',
  racing: 'Гонки',
  rpg: 'Ролевые игры',
  shooter: 'Шутеры',
  simulation: 'Симуляторы',
  sports: 'Спортивные игры',
  strategy: 'Стратегии',
  survival: 'Выживание'
};

export const GENRES_MAP = GENRE_LABELS;
