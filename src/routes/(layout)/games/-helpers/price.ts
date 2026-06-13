import type { PriceVariant } from '@/shared/api/generated';

const rubleFormatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  maximumFractionDigits: 0,
  style: 'currency'
});

export const formatProductPrice = (price: number): string =>
  rubleFormatter.format(price).replace(/\u00A0/g, ' ');

export const getProductDiscountPercent = (variant: PriceVariant): number | null => {
  if (!variant.oldPrice || variant.oldPrice <= variant.price) {
    return null;
  }

  return Math.round(((variant.oldPrice - variant.price) / variant.oldPrice) * 100);
};
