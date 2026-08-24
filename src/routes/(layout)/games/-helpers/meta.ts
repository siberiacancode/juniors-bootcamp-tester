import type { GameDetailed } from '@/generated/api';

import { formatProductDate } from '@/utils/helpers/date';
import { intl } from '@/utils/lib';

export const productMetaItems = (game: GameDetailed): { label: string; value: string }[] => [
  {
    label: intl.formatMessage({ id: 'page.gameProduct.meta.releaseDate' }),
    value: formatProductDate(game.releaseDate)
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.meta.developer' }),
    value: game.developer
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.meta.publisher' }),
    value: game.publisher
  },
  {
    label: intl.formatMessage({ id: 'page.gameProduct.meta.steamId' }),
    value: game.externalId
  }
];
