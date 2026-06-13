import type { DetailedGame, PriceVariant } from '@/shared/api/generated';

export type ProductGame = DetailedGame & {
  priceVariants: PriceVariant[];
};
