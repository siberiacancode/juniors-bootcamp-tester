import type { DetailedGame, PriceVariant } from '@/generated/api';

export type ProductGame = DetailedGame & {
  priceVariants: PriceVariant[];
};
