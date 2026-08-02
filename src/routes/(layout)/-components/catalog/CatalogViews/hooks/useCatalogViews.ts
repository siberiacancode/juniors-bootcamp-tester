import { getRouteApi } from '@tanstack/react-router';

import { ALL_CATALOG_VIEWS } from '@/routes/(layout)/-constants';

const catalogRoute = getRouteApi('/(layout)/');

export const useCatalogViews = () => {
  const searchParams = catalogRoute.useSearch();
  const navigate = catalogRoute.useNavigate();

  const onViewChange = (view: '' | (typeof ALL_CATALOG_VIEWS)[number]) => {
    if (view === '') return;

    navigate({
      search: (currentSearch) => ({
        ...currentSearch,
        view: view === 'all' ? undefined : view
      })
    });
  };

  return {
    state: {
      selectedView: searchParams.view ?? 'all',
      views: ALL_CATALOG_VIEWS
    },
    functions: {
      onViewChange
    }
  };
};
