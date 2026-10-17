import { getGamesInfo } from '../../generated/api/requests.gen';
import { getBackendUrl, parseCatalogQuery } from '../lib/catalog';
import { Catalog } from './_components/catalog';

export interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const toUrlSearchParams = (params: Awaited<CatalogPageProps['searchParams']>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];

    values.forEach((item) => {
      if (item !== undefined) searchParams.append(key, item);
    });
  });

  if (!searchParams.has('page')) searchParams.set('page', '1');
  if (!searchParams.has('limit')) searchParams.set('limit', '12');

  return searchParams;
};

const loadCatalog = async (searchParams: URLSearchParams) => {
  try {
    const parsedQuery = parseCatalogQuery(searchParams);
    const response = await getGamesInfo({
      query: {
        ...parsedQuery,
        limit: parsedQuery.limit ?? 12,
        page: parsedQuery.page ?? 1
      },
      config: {
        baseURL: getBackendUrl(),
        cache: 'no-store'
      }
    });

    if (!response.data.success) throw new Error(response.data.reason);

    return { catalog: response.data };
  } catch {
    return { error: 'Каталог недоступен. Запустите mock-сервер командой pnpm mock.' };
  }
};

const CatalogPage = async ({ searchParams }: CatalogPageProps) => {
  const resolvedSearchParams = await searchParams;
  const requestSearchParams = toUrlSearchParams(resolvedSearchParams);
  const catalogResult = await loadCatalog(requestSearchParams);

  return <Catalog {...catalogResult} searchParams={requestSearchParams} />;
};

export default CatalogPage;
