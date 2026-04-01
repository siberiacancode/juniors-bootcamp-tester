import { createFileRoute } from '@tanstack/react-router';

import { useGetGamesInfo } from '@/hooks/useGetGamesInfo';

const Index = () => {
  const { data: games = [] } = useGetGamesInfo();
  
  return (
    <div className='p-2'>
    <h3>Welcome Home!</h3>
    {games.map((game) => (
      <div key={game.id}>{game.name}</div>
    ))}
  </div>
  )
  
};

export const Route = createFileRoute('/')({
  component: Index
});
