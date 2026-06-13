import type { GameGenre } from '@/shared/api/generated';

export interface FilterValue {
  genre: GameGenre[];
  showDlc: boolean;
  withDiscount: boolean;
}
