import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { queryClient } from '@/queryclient';
import { gamesQueryOptions } from '@/utils/queries/game';

const Index = () => {
  const { data: games } = useSuspenseQuery(gamesQueryOptions);

  return (
    <div className='p-2'>
      <h3>Welcome Home!</h3>
      {games.map((game) => (
        <div key={game.id}>{game.name}</div>
      ))}
    </div>
  );
};

export const Route = createFileRoute('/')({
  loader: () => queryClient.ensureQueryData(gamesQueryOptions),
  component: Index
});
