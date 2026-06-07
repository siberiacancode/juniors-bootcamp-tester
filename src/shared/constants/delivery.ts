import type { DeliveryType } from '../api/generated';

export const DELIVERY_LABELS: Record<DeliveryType, string> = {
  epic_key: 'Epic ключ',
  nintendo_key: 'Nintendo ключ',
  playstation_key: 'PlayStation ключ',
  steam_gift: 'Steam gift',
  steam_key: 'Steam ключ',
  xbox_key: 'Xbox ключ'
};
