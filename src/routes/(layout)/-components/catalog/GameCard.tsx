import { Link } from '@tanstack/react-router';

import type { FilteredGame } from '@/shared/api/generated';

import { Badge } from '@/shared/components/ui/badge';
import { Typography } from '@/shared/components/ui/typography';

import { formatCatalogPrice, getDiscountPercent } from '../../-helpers/catalog';

interface GameCardProps {
  game: FilteredGame;
}

const GameCard = ({ game }: GameCardProps) => {
  const discountPercent = getDiscountPercent(game);

  return (
    <article className='min-w-0'>
      <Link
        className='group block min-w-0 rounded-24 outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
        params={{ slug: game.slug }}
        to='/games/$slug'
      >
        <div className='aspect-460/215 w-full overflow-hidden rounded-24 bg-secondary'>
          <img
            alt={game.name}
            className='size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]'
            loading='lazy'
            src={game.image}
          />
        </div>

        <div className='mt-4 flex min-w-0 flex-col gap-1.5'>
          <div className='flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1'>
            <Typography
              as='span'
              className='text-[24px]/8 font-medium tracking-normal lg:text-[20px]/7'
              variant='body-lg'
            >
              {formatCatalogPrice(game.priceVariant.price)}
            </Typography>
            {discountPercent !== null && (
              <Badge className='px-3 py-1 text-[16px]/5 font-extrabold tracking-normal' variant='accent'>
                -{discountPercent}%
              </Badge>
            )}
            {game.priceVariant.oldPrice && (
              <Typography
                as='span'
                className='text-[20px]/7 font-medium tracking-normal text-foreground/40 line-through lg:text-[18px]/6.5'
                variant='body-md'
              >
                {formatCatalogPrice(game.priceVariant.oldPrice)}
              </Typography>
            )}
          </div>

          <Typography
            as='h2'
            className='min-w-0 text-[22px]/7 font-medium tracking-normal text-foreground lg:text-[20px]/7'
            variant='body-lg'
          >
            {game.name}
          </Typography>
        </div>
      </Link>
    </article>
  );
};

export { GameCard };
