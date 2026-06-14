import type { DeliveryType, Region } from '@/generated/api';

import { DELIVERY_LABELS, REGION_KEYS, REGION_LABELS } from '@/constants';

export interface ProductRegionOption {
  label: string;
  value: Region;
}

export interface ProductDeliveryOption {
  description: string;
  label: string;
  value: DeliveryType;
}

const PRODUCT_DELIVERY_VALUES: DeliveryType[] = [
  'steam_key',
  'steam_gift',
  'xbox_key',
  'playstation_key'
] as const;

export const PRODUCT_DELIVERY_ACCOUNT_LABELS: Record<DeliveryType, string> = {
  epic_key: DELIVERY_LABELS.epic_key,
  nintendo_key: DELIVERY_LABELS.nintendo_key,
  playstation_key: DELIVERY_LABELS.playstation_key,
  steam_gift: 'Steam',
  steam_key: 'Steam',
  xbox_key: DELIVERY_LABELS.xbox_key
};

export const PRODUCT_DELIVERY_OPTIONS: ProductDeliveryOption[] = PRODUCT_DELIVERY_VALUES.map(
  (value) => ({
    description: 'Код',
    label: DELIVERY_LABELS[value],
    value
  })
);

export const PRODUCT_REGION_OPTIONS: ProductRegionOption[] = REGION_KEYS.map((value) => ({
  label: REGION_LABELS[value],
  value
}));
