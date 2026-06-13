import type { DeliveryType } from '../api/generated';

export const DELIVERY_LABELS: Record<DeliveryType, string> = {
  epic_key: 'Epic',
  nintendo_key: 'Nintendo',
  playstation_key: 'PlayStation',
  steam_gift: 'Steam Gift',
  steam_key: 'Steam ключ',
  xbox_key: 'Xbox One/Series'
};
