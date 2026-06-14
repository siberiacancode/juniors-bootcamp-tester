import type { PriceVariant } from '@/generated/api';

import { formatMoney } from '@/helpers/utils';

export const formatProductPrice = (price: number): string => formatMoney(price);

export const getProductDiscountPercent = (variant: PriceVariant): number | null => {
  if (!variant.oldPrice || variant.oldPrice <= variant.price) {
    return null;
  }

  return Math.round(((variant.oldPrice - variant.price) / variant.oldPrice) * 100);
};
