import { createIntl, createIntlCache } from 'react-intl';

import ruMessages from '../../../../static/ru.json';

export const LOCALE = 'ru';

export const messages = ruMessages;

const cache = createIntlCache();

export const intl = createIntl(
  {
    locale: LOCALE,
    messages
  },
  cache
);
