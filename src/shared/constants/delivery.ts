import type { DeliveryType } from '../api/generated';

export const DELIVERY_LABELS: Record<DeliveryType, string> = {
  epic_key: 'Epic',
  nintendo_key: 'Nintendo',
  playstation_key: 'PlayStation',
  steam_gift: 'Steam gift',
  steam_key: 'Steam',
  xbox_key: 'Xbox'
};
