import type { GameGenre } from '@/generated/api';

export interface FilterValue {
  genre: GameGenre[];
  showDlc: boolean;
  withDiscount: boolean;
}
