import { afterEach, describe, expect, it, vi } from 'vitest';

import { createGamesPaginatedResponseFake } from '../../../../generated/api/fakers.gen';
import * as gamesApi from '../../../../generated/api/requests.gen';
import { GET } from './route';

describe('GET /api/games', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('forwards supported query parameters to the original API', async () => {
    vi.stubEnv('BACKEND_URL', 'https://backend.test/api/tester');
    const responseData = createGamesPaginatedResponseFake({
      games: [],
      meta: { total: 0, page: 2, limit: 6, totalPages: 1 }
    });
    const getGamesInfoSpy = vi.spyOn(gamesApi, 'getGamesInfo').mockResolvedValue({
      config: {
        method: 'GET',
        url: 'https://backend.test/api/tester/games/info'
      },
      data: responseData,
      headers: new Headers({ 'content-type': 'application/json' }),
      options: {},
      status: 200,
      statusText: 'OK',
      url: 'https://backend.test/api/tester/games/info'
    });
    const request = new Request(
      'http://localhost:3000/api/games?genre=action&genre=rpg&filter=discount&view=new&page=2&limit=6&ignored=value'
    );

    const response = await GET(request);

    expect(getGamesInfoSpy).toHaveBeenCalledOnce();
    expect(getGamesInfoSpy).toHaveBeenCalledWith({
      query: {
        filter: ['discount'],
        genre: ['action', 'rpg'],
        limit: 6,
        page: 2,
        view: 'new'
      },
      config: {
        baseURL: 'https://backend.test/api/tester',
        cache: 'no-store'
      }
    });
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(responseData);
  });
});
