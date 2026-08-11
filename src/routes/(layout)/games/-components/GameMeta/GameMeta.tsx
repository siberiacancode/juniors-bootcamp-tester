import { Typography } from '@/components/ui/typography';

import type { GamePageState } from '../types';

interface GameMetaProps {
  items: GamePageState['metaItems'];
}

export const GameMeta = ({ items }: GameMetaProps) => (
  <section className='mb-6 flex h-fit flex-col gap-2 border-none p-0 [grid-area:meta] sm:mb-0 sm:rounded-24 sm:bg-secondary sm:p-6'>
    {items.map((item) => (
      <div key={item.label} className='flex flex-col'>
        <Typography as='span' className='text-muted-fg' variant='caption'>
          {item.label}
        </Typography>
        <Typography as='span' variant='body-sm'>
          {item.value}
        </Typography>
      </div>
    ))}
  </section>
);
