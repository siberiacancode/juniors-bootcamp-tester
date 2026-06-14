import type { GameOrder } from '@/generated/api';

export type OrderHistoryItem = GameOrder & {
  paymentAmount: number;
  paymentMethod: string;
};
