import { expect, it } from 'vitest';

import { formatProductDate } from './date';

it('Should format product date', () => {
  expect(formatProductDate(new Date('2024-01-15T12:00:00Z').getTime())).toBe('15 янв. 2024 г.');
});

it('Should format leap day product date', () => {
  expect(formatProductDate(new Date('2020-02-29T12:00:00Z').getTime())).toBe('29 февр. 2020 г.');
});
