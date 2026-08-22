import { Typography } from '@siberiacancode/uikit';

import { Badge } from '@/components/ui/badge';
import { getAsset } from '@/utils/helpers/assets';
import { IntlText } from '@/utils/lib';

import type { GamePageState } from '../types';

interface GameOverviewProps {
  game: GamePageState['game'];
}

export const GameOverview = ({ game }: GameOverviewProps) => (
  <section className='flex flex-col gap-3 [grid-area:overview] lg:gap-4'>
    <div className='flex flex-col gap-2'>
      <div className='aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary'>
        <img
          alt={game.name}
          className='block size-full object-cover object-center'
          src={getAsset(game.image)}
        />
      </div>
      <Typography as='h1' className='hidden lg:block' variant='title-lg'>
        {game.name}
      </Typography>
      <div className='flex max-w-full scrollbar-none gap-2 overflow-x-auto lg:flex-wrap lg:overflow-visible'>
        {game.genres.map((genre) => (
          <Badge key={genre} className='px-4 py-2 text-[12px]/4 font-bold tracking-wide'>
            <IntlText path={`genre.${genre}`} />
          </Badge>
        ))}
      </div>
    </div>
    <Typography as='p' className='mb-6 tracking-normal sm:mb-0' variant='body-sm'>
      {game.description}
    </Typography>
  </section>
);
