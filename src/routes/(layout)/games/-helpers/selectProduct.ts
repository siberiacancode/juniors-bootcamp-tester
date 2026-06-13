import type { DeliveryType, PriceVariant, Region } from '@/shared/api/generated';

import type { ProductRegionOption } from '../-constants';

import { PRODUCT_REGION_OPTIONS } from '../-constants';

export const findEditionVariants = (
  variants: PriceVariant[],
  deliveryType: DeliveryType,
  region: Region
): PriceVariant[] => {
  const filteredVariants = variants.filter(
    (variant) => variant.deliveryType === deliveryType && variant.region === region
  );

  const editions = new Set<string>();

  return filteredVariants.filter((variant) => {
    if (editions.has(variant.edition)) {
      return false;
    }

    editions.add(variant.edition);
    return true;
  });
};

export const findAllRegions = (
  variants: PriceVariant[],
  deliveryType: DeliveryType
): ProductRegionOption[] => {
  const regions = new Set<Region>();

  variants.forEach((variant) => {
    if (variant.deliveryType === deliveryType) {
      regions.add(variant.region);
    }
  });

  return PRODUCT_REGION_OPTIONS.filter((option) => regions.has(option.value));
};

export const findVariant = (
  variants: PriceVariant[],
  deliveryType: DeliveryType,
  region: Region,
  edition: string
): PriceVariant =>
  variants.find(
    (variant) =>
      variant.deliveryType === deliveryType &&
      variant.region === region &&
      variant.edition === edition
  ) ??
  variants.find((variant) => variant.deliveryType === deliveryType && variant.region === region) ??
  variants.find((variant) => variant.deliveryType === deliveryType) ??
  variants[0];
