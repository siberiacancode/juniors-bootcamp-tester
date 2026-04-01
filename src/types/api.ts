export const BASE_URL = 'https://juniorsbootcamp.ru/api'

export interface ApiListResponse<T> {
    success: boolean;
    reason: string;
    data: T[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }

export interface GameInfo {
  id: string;
  name: string;
  slug: string;
  externalId: string;
  year: number;
  genres: string[];
  description: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
}
