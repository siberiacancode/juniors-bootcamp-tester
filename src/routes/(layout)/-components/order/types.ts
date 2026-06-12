import type { GameOrder } from '@/shared/api/generated';

export type OrderHistoryItem = GameOrder & {
  paymentAmount: number;
  paymentMethod: string;
};
