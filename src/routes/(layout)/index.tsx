import { Typography } from '@siberiacancode/uikit';
import { createFileRoute, stripSearchParams } from '@tanstack/react-router';

import { IntlText } from '@/utils/lib/intl';

import { CatalogSearch } from './-components';
import { CatalogContent, CatalogSaleBanner, CatalogViews } from './-components/catalog';
import { CatalogFiltersDesktop, CatalogFiltersMobile } from './-components/catalog/CatalogFilters';
import { catalogSearchSchema, DEFAULT_CATALOG_SEARCH } from './-constants';

const CatalogPage = () => (
  <div className='flex flex-col gap-6 sm:pt-10 sm:pb-28'>
    <Typography as='h1' className='lg:hidden' variant='title-md'>
      <IntlText path='page.catalog.title' />
    </Typography>

    <div className='flex items-end gap-2'>
      <CatalogSearch />
      <CatalogFiltersMobile />
    </div>

    <CatalogViews />

    <div className='grid gap-10 lg:grid-cols-[264px_minmax(0,1fr)] lg:items-start lg:gap-4'>
      <aside className='hidden flex-col gap-6 lg:flex'>
        <CatalogFiltersDesktop />
        <CatalogSaleBanner />
      </aside>

      <main className='flex min-w-0 flex-col gap-6 lg:gap-4'>
        <CatalogContent />
      </main>
    </div>
  </div>
);

export const Route = createFileRoute('/(layout)/')({
  component: CatalogPage,
  validateSearch: catalogSearchSchema,
  search: {
    middlewares: [stripSearchParams(DEFAULT_CATALOG_SEARCH)]
  }
});
