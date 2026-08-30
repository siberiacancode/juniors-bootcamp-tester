import { rest } from 'mock-config-server';

import type { GetCardsResponse } from '@/generated/api';

import { COOKIE_KEYS } from '../../../../../utils/constants';
import { CASE_ID } from '../constants';

export const getCardsCards = rest.get<{
  response: GetCardsResponse;
}>('/cards/cards', {
  match: {
    cookies: {
      [COOKIE_KEYS.TEST_CASE]: CASE_ID
    }
  },
  response: {
    success: true,
    cards: []
  }
});
