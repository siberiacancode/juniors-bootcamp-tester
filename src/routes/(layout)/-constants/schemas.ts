import z from 'zod';

import { GENRES } from '@/helpers/constants';

import { CATALOG_FILTERS, CATALOG_VIEWS } from './catalog';

export const catalogSearchSchema = z.object({
  genre: z.array(z.enum(GENRES)).default([]),
  filter: z.array(z.enum(CATALOG_FILTERS)).default([]),
  view: z.enum(CATALOG_VIEWS).optional().catch(undefined)
});

export type CatalogSearchParams = z.infer<typeof catalogSearchSchema>;

export const DEFAULT_CATALOG_SEARCH: CatalogSearchParams = {
  genre: [],
  filter: [],
  view: undefined
};
