import { getRouteApi } from '@tanstack/react-router';

import { GameView } from '@/generated/api';

const catalogRoute = getRouteApi('/(layout)/');
const CATALOG_ALL_VIEW = 'all';

export type CatalogView = GameView | typeof CATALOG_ALL_VIEW;

export const useCatalogViews = () => {
  const searchParams = catalogRoute.useSearch();
  const navigate = catalogRoute.useNavigate();

  const onViewChange = (view: CatalogView) => {
    navigate({
      search: (currentSearch) => ({
        ...currentSearch,
        view: view === CATALOG_ALL_VIEW ? undefined : view
      })
    });
  };

  return {
    state: {
      selectedView: searchParams.view ?? CATALOG_ALL_VIEW,
      views: [CATALOG_ALL_VIEW, GameView.NEW, GameView.POPULAR] as const
    },
    functions: {
      onViewChange
    }
  };
};
