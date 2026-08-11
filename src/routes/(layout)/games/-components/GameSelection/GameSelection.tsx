import { CheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib';
import { cn } from '@/lib/utils';

import type { GamePageFunctions, GamePageState } from '../types';

import { DELIVERY_TYPE_VIEW } from '../../-constants';
import { GameSelectionSkeleton } from './GameSelectionSkeleton';

interface GameSelectionProps {
  functions: GamePageFunctions;
  state: GamePageState;
}

export const GameSelection = ({ functions, state }: GameSelectionProps) => (
  <section className='flex flex-col gap-6 [grid-area:selection] lg:gap-4'>
    {state.isSelectionReady ? (
      <>
        <div className='flex flex-col gap-3'>
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.deliveryTypeTitle' />
          </Typography>
          <div className='flex flex-col gap-2'>
            {state.game.deliveryTypes.map((deliveryType) => {
              const option = DELIVERY_TYPE_VIEW[deliveryType];
              const Icon = option.Icon;

              return (
                <Button
                  key={deliveryType}
                  className='h-auto w-full justify-start rounded-24! bg-secondary p-4 text-left whitespace-normal hover:bg-secondary-hover/40 disabled:opacity-70'
                  disabled={state.isSelectionLoading}
                  size='lg'
                  type='button'
                  variant='secondary'
                  onClick={() => functions.onDeliveryTypeChange(deliveryType)}
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
                      state.selectedDeliveryType === deliveryType &&
                        'border-primary bg-primary text-primary-fg'
                    )}
                  >
                    {state.selectedDeliveryType === deliveryType && (
                      <CheckIcon className='size-4' />
                    )}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText
              path='page.gameProduct.regionTitle'
              values={{ platform: DELIVERY_TYPE_VIEW[state.selectedDeliveryType].platform }}
            />
          </Typography>
          <div className='flex flex-wrap gap-2'>
            {state.regions.map((region) => (
              <Button
                key={region}
                className={cn(
                  'bg-secondary text-foreground hover:bg-secondary-hover/50 disabled:opacity-70',
                  state.selectedRegion === region &&
                    'bg-primary text-primary-fg hover:bg-primary/90'
                )}
                disabled={state.isSelectionLoading}
                size='md'
                type='button'
                variant='secondary'
                onClick={() => functions.onRegionChange(region)}
              >
                <IntlText path={`region.${region}`} />
              </Button>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <Typography variant={state.isDesktop ? 'title-md' : 'body-md'}>
            <IntlText path='page.gameProduct.editionTitle' />
          </Typography>
          <div className='flex flex-col gap-2'>
            {state.editions.map((edition) => (
              <Button
                key={edition}
                className='h-auto w-full justify-start rounded-16 bg-transparent px-0 py-1 text-left hover:bg-transparent disabled:opacity-70'
                disabled={state.isSelectionLoading}
                type='button'
                variant='ghost'
                onClick={() => functions.onEditionChange(edition)}
              >
                <span
                  className={cn(
                    'flex size-5 items-center justify-center rounded-full bg-background',
                    state.selectedPriceVariant.edition === edition && 'bg-primary text-primary-fg'
                  )}
                >
                  {state.selectedPriceVariant.edition === edition && (
                    <CheckIcon className='size-4' />
                  )}
                </span>
                <Typography as='span' variant='caption'>
                  {edition}
                </Typography>
              </Button>
            ))}
          </div>
        </div>
      </>
    ) : (
      <GameSelectionSkeleton />
    )}
  </section>
);
