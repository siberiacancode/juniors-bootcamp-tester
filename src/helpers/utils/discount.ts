export const formatDiscountPercent = (price: number, oldPrice: number) =>
  `-${(((oldPrice - price) / oldPrice) * 100).toFixed(0)}%`;
