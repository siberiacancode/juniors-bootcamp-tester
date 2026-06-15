import type { GameFilter, GameGenre, GameView } from '@/generated/api';

export const CATALOG_GENRES: GameGenre[] = [
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
];

export const CATALOG_VIEWS: GameView[] = ['new', 'popular'];

export const ALL_CATALOG_VIEWS = ['all', ...CATALOG_VIEWS] as const;

export const CATALOG_FILTERS: GameFilter[] = ['discount', 'dlc'];
