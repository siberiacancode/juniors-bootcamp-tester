import { expect, it } from 'vitest';

import { formatProductDate } from './date';

it('Should format product date with russian short month', () => {
  expect(formatProductDate(Date.UTC(2024, 0, 15, 12))).toBe('15 янв. 2024 г.');
});

it('Should format leap day product date', () => {
  expect(formatProductDate(Date.UTC(2020, 1, 29, 12))).toBe('29 февр. 2020 г.');
});
