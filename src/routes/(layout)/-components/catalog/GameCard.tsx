import { Link } from '@tanstack/react-router';

import type { FilteredGame } from '@/generated/api';

import { Badge } from '@/components/ui/badge';
import { Typography } from '@/components/ui/typography';

import { formatCatalogPrice, getDiscountPercent, getGameImageSrc } from '../../-helpers/catalog';

interface GameCardProps {
  game: FilteredGame;
}

export const GameCard = ({ game }: GameCardProps) => {
  const discountPercent = getDiscountPercent(game);

  return (
    <article className='min-w-0'>
      <Link
        className='group block min-w-0 rounded-24 outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
        params={{ slug: game.slug }}
        to='/games/$slug'
      >
        <div className='aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary lg:rounded-12'>
          <img
            alt={game.name}
            className='size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]'
            loading='lazy'
            src={getGameImageSrc(game.image)}
          />
        </div>

        <div className='mt-4 flex min-w-0 flex-col gap-1.5 lg:mt-2 lg:gap-0.5'>
          <div className='flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1 lg:min-h-4 lg:gap-x-1.5'>
            <Typography
              as='span'
              className='text-[24px]/8 font-medium tracking-normal lg:text-[12px]/4'
              variant='body-lg'
            >
              {formatCatalogPrice(game.priceVariant.price)}
            </Typography>
            {discountPercent !== null && (
              <Badge
                className='px-3 py-1 text-[16px]/5 font-extrabold tracking-normal lg:px-1.5 lg:py-0.5 lg:text-[10px]/3'
                variant='accent'
              >
                -{discountPercent}%
              </Badge>
            )}
            {game.priceVariant.oldPrice && (
              <Typography
                as='span'
                className='text-[20px]/7 font-medium tracking-normal text-foreground/40 line-through lg:text-[11px]/4'
                variant='body-md'
              >
                {formatCatalogPrice(game.priceVariant.oldPrice)}
              </Typography>
            )}
          </div>

          <Typography
            as='h2'
            className='min-w-0 text-[22px]/7 font-medium tracking-normal text-foreground lg:text-[11px]/4'
            variant='body-lg'
          >
            {game.name}
          </Typography>
        </div>
      </Link>
    </article>
  );
};
