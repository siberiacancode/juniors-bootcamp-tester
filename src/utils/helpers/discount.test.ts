import { expect, it } from 'vitest';

import { formatDiscountPercent } from './discount';

it('Should format discount percent', () => {
  expect(formatDiscountPercent(750, 1000)).toBe('-25%');
});

it('Should round discount percent to the nearest integer', () => {
  expect(formatDiscountPercent(666, 1000)).toBe('-33%');
});

it('Should format half price discount', () => {
  expect(formatDiscountPercent(500, 1000)).toBe('-50%');
});

it('Should format zero discount', () => {
  expect(formatDiscountPercent(1000, 1000)).toBe('-0%');
});
