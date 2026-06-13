import { Badge } from '@/shared/components/ui/badge';
import { Typography } from '@/shared/components/ui/typography';
import { GENRE_LABELS } from '@/shared/constants';

import type { ProductGame } from '../-types';

export const ProductOverview = ({ game }: { game: ProductGame }) => (
  <div className='flex flex-col gap-3 lg:gap-4'>
    <div className='flex flex-col gap-2'>
      <div className='w-full overflow-hidden rounded-24 bg-secondary'>
        <img alt={game.name} className='size-full object-cover object-center' src={game.image} />
      </div>
      <Typography
        as='h1'
        className='hidden text-[32px]/10 font-bold tracking-normal lg:block'
        variant='title-lg'
      >
        {game.name}
      </Typography>

      <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden'>
        {game.genres.map((genre) => (
          <Badge key={genre} className='px-4 py-2 text-[12px]/4 font-bold tracking-normal'>
            {GENRE_LABELS[genre]}
          </Badge>
        ))}
      </div>
    </div>
    <Typography
      as='p'
      className='mb-6 text-[16px]/6 font-medium tracking-normal text-foreground sm:mb-0'
      variant='body-sm'
    >
      {game.description}
    </Typography>
  </div>
);
