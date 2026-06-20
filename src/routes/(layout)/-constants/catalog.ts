import type { GameFilter, GameView } from '@/generated/api';

export const CATALOG_VIEWS: GameView[] = ['new', 'popular'];

export const ALL_CATALOG_VIEWS = ['all', ...CATALOG_VIEWS] as const;

export const CATALOG_FILTERS: GameFilter[] = ['discount', 'dlc'];
