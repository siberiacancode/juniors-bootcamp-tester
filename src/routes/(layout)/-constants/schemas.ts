import z from 'zod';

import { GameFilter, GameGenre, GameView } from '@/generated/api';

export const CATALOG_GAMES_LIMIT = 12;

export const catalogSearchSchema = z.object({
  genre: z.array(z.enum(GameGenre)).default([]),
  filter: z.array(z.enum(GameFilter)).default([]),
  view: z.enum(GameView).optional().catch(undefined)
});

export type CatalogSearchParams = z.infer<typeof catalogSearchSchema>;

export const DEFAULT_CATALOG_SEARCH: CatalogSearchParams = {
  genre: [],
  filter: [],
  view: undefined
};
