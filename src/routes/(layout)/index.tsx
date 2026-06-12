import { createFileRoute, stripSearchParams } from '@tanstack/react-router';
import z from 'zod';

import type { CatalogFilters } from './-helpers/catalog';

import { CatalogPage } from './-components';
import { CATALOG_GENRES, CATALOG_VIEWS } from './-constants/catalog';

const CATALOG_VIEW_VALUES = CATALOG_VIEWS.map((view) => view.value);

const DEFAULT_SEARCH = {
  genre: [],
  q: '',
  showDlc: false,
  view: 'all',
  withDiscount: false
} satisfies CatalogFilters;

const catalogSearchSchema = z.object({
  genre: z.array(z.enum(CATALOG_GENRES)).default(DEFAULT_SEARCH.genre).catch(DEFAULT_SEARCH.genre),
  q: z.string().default(DEFAULT_SEARCH.q).catch(DEFAULT_SEARCH.q),
  showDlc: z.boolean().default(DEFAULT_SEARCH.showDlc).catch(DEFAULT_SEARCH.showDlc),
  view: z.enum(CATALOG_VIEW_VALUES).default(DEFAULT_SEARCH.view).catch(DEFAULT_SEARCH.view),
  withDiscount: z.boolean().default(DEFAULT_SEARCH.withDiscount).catch(DEFAULT_SEARCH.withDiscount)
});

export const Route = createFileRoute('/(layout)/')({
  component: RouteComponent,
  validateSearch: catalogSearchSchema,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)]
  }
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const onSearchChange = (value: Partial<CatalogFilters>) => {
    navigate({
      search: (current) => ({
        ...current,
        ...value
      })
    });
  };

  const onResetFilters = () => {
    navigate({
      search: (current) => ({
        ...DEFAULT_SEARCH,
        q: current.q,
        view: current.view
      })
    });
  };

  return (
    <CatalogPage search={search} onResetFilters={onResetFilters} onSearchChange={onSearchChange} />
  );
}
