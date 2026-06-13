import { createFileRoute } from '@tanstack/react-router';

import { ProductPage } from './-components';
import { productGames } from './-constants/product';

export const Route = createFileRoute('/(layout)/games/$slug')({
  component: RouteComponent
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const game = productGames.find((productGame) => productGame.slug === slug) ?? productGames[0];

  return <ProductPage game={game} />;
}
