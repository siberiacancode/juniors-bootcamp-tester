import { useMemo } from 'react';

import type { DeliveryType, PriceVariant, Region } from '@/shared/api/generated';

import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/utils';

import type { ProductGame } from '../-types';

import {
  deliveryIcons,
  PRODUCT_DELIVERY_ACCOUNT_LABELS,
  PRODUCT_DELIVERY_OPTIONS,
  PRODUCT_REGION_OPTIONS
} from '../-constants';
import { findAllRegions, findEditionVariants, findVariant, formatProductPrice } from '../-helpers';
import { SelectionMark } from './SelectionMark';

interface ProductSelectionProps {
  game: ProductGame;
  selectedVariant: PriceVariant;
  onVariantChange: (value: PriceVariant) => void;
}

// TODO: Тут для вариантов можно добавь на бэке id, тогда можно будет упростить поиск
export const ProductSelection = ({
  game,
  selectedVariant,
  onVariantChange
}: ProductSelectionProps) => {
  const selectedDelivery = selectedVariant.deliveryType;
  const selectedEdition = selectedVariant.edition;
  const selectedRegion = selectedVariant.region;

  const availableRegions = useMemo(() => {
    const regions = findAllRegions(game.priceVariants, selectedDelivery);

    return PRODUCT_REGION_OPTIONS.filter((option) => regions.includes(option.value));
  }, [game.priceVariants, selectedDelivery]);
  const editionVariants = useMemo(
    () => findEditionVariants(game.priceVariants, selectedDelivery, selectedRegion),
    [game.priceVariants, selectedDelivery, selectedRegion]
  );

  const handleDeliveryChange = (deliveryType: DeliveryType) => {
    onVariantChange(findVariant(game.priceVariants, deliveryType, selectedRegion, selectedEdition));
  };

  const handleRegionChange = (region: Region) => {
    onVariantChange(findVariant(game.priceVariants, selectedDelivery, region, selectedEdition));
  };

  const handleEditionChange = (edition: string) => {
    onVariantChange(findVariant(game.priceVariants, selectedDelivery, selectedRegion, edition));
  };

  return (
    <div className='flex flex-col gap-6 lg:gap-4'>
      <section className='flex flex-col gap-3'>
        <Typography className='lg:text-[24px]/8 lg:font-bold' variant='body-md'>
          Способ получения
        </Typography>
        <div className='flex flex-col gap-2'>
          {PRODUCT_DELIVERY_OPTIONS.filter((option) =>
            game.deliveryTypes.includes(option.value)
          ).map((option) => {
            const Icon = deliveryIcons[option.value];

            return (
              <button
                key={option.value}
                className='flex w-full items-center gap-2 rounded-24 bg-secondary p-4 text-left transition outline-none hover:bg-secondary-hover/40'
                type='button'
                onClick={() => handleDeliveryChange(option.value)}
              >
                <Icon className='size-8' strokeWidth={1.5} />
                <span className='flex flex-1 flex-col'>
                  <Typography variant='body-sm'>{option.label}</Typography>
                  <Typography className='text-muted-fg' variant='caption'>
                    {option.description}
                  </Typography>
                </span>
                <SelectionMark active={selectedDelivery === option.value} />
              </button>
            );
          })}
        </div>
      </section>

      <section className='flex flex-col gap-3'>
        <Typography className='lg:text-[24px]/8 lg:font-bold' variant='body-md'>
          {`Регион ${PRODUCT_DELIVERY_ACCOUNT_LABELS[selectedDelivery]}-аккаунта`}
        </Typography>
        <div className='flex flex-wrap gap-2'>
          {availableRegions.map((region) => (
            <button
              key={region.value}
              className={cn(
                'h-10 rounded-full bg-secondary px-6 py-2 text-[14px]/5.5 font-medium hover:bg-secondary-hover/50',
                selectedRegion === region.value && 'bg-primary text-primary-fg hover:bg-primary/90'
              )}
              type='button'
              onClick={() => handleRegionChange(region.value)}
            >
              {region.label}
            </button>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-3'>
        <Typography className='lg:text-[24px]/8 lg:font-bold' variant='body-md'>
          Издание
        </Typography>
        <div className='flex flex-col gap-2'>
          {editionVariants.map((variant) => (
            <button
              key={`${variant.deliveryType}-${variant.region}-${variant.edition}`}
              className='flex w-full items-center gap-2 rounded-16 py-1 text-left transition outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
              type='button'
              onClick={() => handleEditionChange(variant.edition)}
            >
              <SelectionMark active={selectedEdition === variant.edition} />
              <Typography
                as='span'
                className='min-w-0 flex-1 text-[14px]/5.5 font-medium tracking-normal'
                variant='caption'
              >
                {variant.edition}
              </Typography>
              <Typography
                as='span'
                className='text-[14px]/5.5 font-medium tracking-normal whitespace-nowrap'
                variant='caption'
              >
                {formatProductPrice(variant.price)}
              </Typography>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
