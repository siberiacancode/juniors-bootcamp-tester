import { expect, it } from 'vitest';

import { formatMoney } from './money';

it('Should format money with default ruble currency', () => {
  expect(formatMoney(1234567)).toBe('1 234 567 ₽');
});

it('Should round money to integer by default', () => {
  expect(formatMoney(1234.56)).toBe('1 235 ₽');
});

it('Should format money with custom locale and options', () => {
  expect(
    formatMoney(1234.56, {
      locales: 'en-US',
      options: {
        currency: 'USD',
        maximumFractionDigits: 2,
        style: 'currency'
      }
    })
  ).toBe('$1,234.56');
});
