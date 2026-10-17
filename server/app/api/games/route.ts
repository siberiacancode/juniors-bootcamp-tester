import { getGamesInfo } from '../../../../generated/api/requests.gen';
import { getBackendUrl, parseCatalogQuery } from '../../../lib/catalog';

export const GET = async (request: Request) => {
  const requestUrl = new URL(request.url);
  const response = await getGamesInfo({
    query: parseCatalogQuery(requestUrl.searchParams),
    config: {
      baseURL: getBackendUrl(),
      cache: 'no-store'
    }
  });

  return Response.json(response.data, { status: response.status });
};
