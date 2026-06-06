import type { GameGenre } from '../api/generated';

export const GENRES_MAP: Record<GameGenre, string> = {
  action: 'Экшен',
  adventure: 'Приключение',
  rpg: 'РПГ',
  strategy: 'Стратегия',
  simulation: 'Симулятор',
  sports: 'Спорт',
  horror: 'Ужасы',
  racing: 'Гонки',
  shooter: 'Шутер',
  indie: 'Инди',
  survival: 'Выживание'
};
