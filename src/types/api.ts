export const BASE_URL = 'https://juniorsbootcamp.ru/api';

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  reason: string;
  success: boolean;
}

export interface GameInfo {
  description: string;
  externalId: string;
  genres: string[];
  id: string;
  image: string;
  name: string;
  oldPrice: number;
  price: number;
  rating: number;
  slug: string;
  year: number;
}
