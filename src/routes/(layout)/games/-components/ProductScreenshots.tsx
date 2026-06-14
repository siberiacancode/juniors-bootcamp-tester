import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import type { ProductGame } from '../-types';

export const ProductScreenshots = ({
  className,
  game
}: {
  className?: string;
  game: ProductGame;
}) => (
  <section className={cn('mb-6 flex flex-col gap-3 sm:mb-0', className)}>
    <Typography className='lg:text-[24px]/8 lg:font-bold' variant='body-md'>
      Скриншоты
    </Typography>
    <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto pb-1 lg:gap-3 [&::-webkit-scrollbar]:hidden'>
      {game.screenshots.map((screenshot) => (
        <div key={screenshot} className='w-68 shrink-0 overflow-hidden rounded-24 bg-secondary'>
          <img alt={`Скриншот ${game.name}`} className='size-full object-cover' src={screenshot} />
        </div>
      ))}
    </div>
  </section>
);
