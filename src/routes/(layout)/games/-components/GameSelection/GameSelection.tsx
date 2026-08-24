import { Button, Typography } from '@siberiacancode/uikit';
import { CheckIcon } from 'lucide-react';

import type { GameDeliveryType, GameRegion } from '@/generated/api';

import { IntlText } from '@/utils/lib';
import { cn } from '@/utils/lib/utils';

import type { GamePageState } from '../types';

import { DELIVERY_TYPE_VIEW } from '../../-constants';

interface GameSelectionProps {
  deliveryTypes: GamePageState['game']['deliveryTypes'];
  editions: GamePageState['editions'];
  isPending: GamePageState['isSelectionPending'];
  regions: GamePageState['regions'];
  selectedDeliveryType: GamePageState['selectedDeliveryType'];
  selectedEdition: GamePageState['selectedPriceVariant']['edition'];
  selectedRegion: GamePageState['selectedRegion'];
  onDeliveryTypeChange: (deliveryType: GameDeliveryType) => void;
  onEditionChange: (edition: string) => void;
  onRegionChange: (region: GameRegion) => void;
}

export const GameSelection = ({
  deliveryTypes,
  editions,
  isPending,
  regions,
  selectedDeliveryType,
  selectedEdition,
  selectedRegion,
  onDeliveryTypeChange,
  onEditionChange,
  onRegionChange
}: GameSelectionProps) => (
  <section
    className={cn(
      'flex flex-col gap-6 transition-opacity [grid-area:selection] lg:gap-4',
      isPending && 'opacity-60'
    )}
    aria-busy={isPending}
    inert={isPending}
  >
    <div className='flex flex-col gap-3'>
      <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
        <IntlText path='page.gameProduct.deliveryTypeTitle' />
      </Typography>
      <div className='flex flex-col gap-2'>
        {deliveryTypes.map((deliveryType) => {
          const option = DELIVERY_TYPE_VIEW[deliveryType];
          const Icon = option.Icon;

          return (
            <Button
              key={deliveryType}
              className='h-auto w-full justify-start rounded-24! bg-secondary p-4 text-left whitespace-normal hover:bg-secondary-hover/40'
              size='lg'
              type='button'
              variant='secondary'
              onClick={() => onDeliveryTypeChange(deliveryType)}
            >
              <Icon className='size-8' />
              <span className='flex flex-1 flex-col'>
                <Typography variant='body-sm'>
                  <IntlText path={option.titlePath} />
                </Typography>
                <Typography className='text-muted-fg' variant='caption'>
                  <IntlText path={option.subtitlePath} />
                </Typography>
              </span>
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-full bg-background',
                  selectedDeliveryType === deliveryType &&
                    'border-primary bg-primary text-primary-fg'
                )}
              >
                {selectedDeliveryType === deliveryType && <CheckIcon className='size-4' />}
              </span>
            </Button>
          );
        })}
      </div>
    </div>

    <div className='flex flex-col gap-3'>
      <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
        <IntlText
          path='page.gameProduct.regionTitle'
          values={{ platform: DELIVERY_TYPE_VIEW[selectedDeliveryType].platform }}
        />
      </Typography>
      <div className='flex flex-wrap gap-2'>
        {regions.map((region) => (
          <Button
            key={region}
            className={cn(
              'bg-secondary text-foreground hover:bg-secondary-hover/50',
              selectedRegion === region && 'bg-primary text-primary-fg hover:bg-primary/90'
            )}
            size='md'
            type='button'
            variant='secondary'
            onClick={() => onRegionChange(region)}
          >
            <IntlText path={`region.${region}`} />
          </Button>
        ))}
      </div>
    </div>

    <div className='flex flex-col gap-3'>
      <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
        <IntlText path='page.gameProduct.editionTitle' />
      </Typography>
      <div className='flex flex-col gap-2'>
        {editions.map((edition) => (
          <Button
            key={edition}
            className='h-auto w-full justify-start rounded-16 bg-transparent px-0 py-1 text-left hover:bg-transparent'
            type='button'
            variant='ghost'
            onClick={() => onEditionChange(edition)}
          >
            <span
              className={cn(
                'flex size-5 items-center justify-center rounded-full bg-background',
                selectedEdition === edition && 'bg-primary text-primary-fg'
              )}
            >
              {selectedEdition === edition && <CheckIcon className='size-4' />}
            </span>
            <Typography as='span' variant='caption'>
              {edition}
            </Typography>
          </Button>
        ))}
      </div>
    </div>
  </section>
);
