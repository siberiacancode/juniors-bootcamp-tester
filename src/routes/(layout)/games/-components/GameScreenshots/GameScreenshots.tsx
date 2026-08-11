import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Typography } from '@/components/ui/typography';
import { getAsset } from '@/helpers/utils/assets';
import { intl, IntlText } from '@/lib';

import type { GamePageState } from '../types';

interface GameScreenshotsProps {
  isDesktop: GamePageState['isDesktop'];
  screenshots: GamePageState['game']['screenshots'];
}

export const GameScreenshots = ({ isDesktop, screenshots }: GameScreenshotsProps) => (
  <section className='mb-6 flex min-w-0 flex-col gap-3 [grid-area:screenshots] sm:mb-0'>
    <Typography variant={isDesktop ? 'title-md' : 'body-md'}>
      <IntlText path='page.gameProduct.screenshots' />
    </Typography>
    <Carousel
      opts={{
        align: 'start',
        dragFree: true
      }}
      className='max-w-full min-w-0 pb-10'
    >
      <CarouselContent className='-ml-2'>
        {screenshots.map((screenshot) => (
          <CarouselItem key={screenshot} className='basis-auto pl-2'>
            <div className='aspect-68/39 w-[min(82vw,24rem)] overflow-hidden rounded-24 bg-secondary sm:w-68'>
              <img
                alt={intl.formatMessage(
                  {
                    id: 'page.gameProduct.screenshotAlt'
                  },
                  {
                    name: screenshot
                  }
                )}
                className='block size-full object-cover'
                src={getAsset(screenshot)}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className='top-auto bottom-0 left-0 hidden size-8 translate-y-0 rounded-full sm:block'
        variant='ghost'
      />
      <CarouselNext
        className='top-auto right-0 bottom-0 hidden size-8 translate-y-0 rounded-full sm:block'
        variant='ghost'
      />
    </Carousel>
  </section>
);
