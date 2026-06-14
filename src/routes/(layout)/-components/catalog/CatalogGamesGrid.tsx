import type { FilteredGame } from '@/generated/api';

import { Typography } from '@/components/ui/typography';

import { GameCard } from './GameCard';

interface CatalogGamesGridProps {
  games: FilteredGame[];
  isError: boolean;
  isLoading: boolean;
}

export const CatalogGamesGrid = ({ games, isError, isLoading }: CatalogGamesGridProps) => {
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return (
      <div className='flex min-h-64 flex-col items-center justify-center gap-4 rounded-24 bg-secondary px-6 text-center'>
        <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
          Не удалось загрузить игры
        </Typography>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className='flex min-h-64 items-center justify-center rounded-24 bg-secondary px-6 text-center'>
        <Typography as='p' className='max-w-80 text-foreground/60' variant='body-md'>
          Ничего не найдено
        </Typography>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-5 xl:gap-x-4'>
      {games.map((game) => (
        <GameCard key={game.slug} game={game} />
      ))}
    </div>
  );
};
