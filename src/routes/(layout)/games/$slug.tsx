import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';
import { useState } from 'react';

import type { PriceVariant } from '@/shared/api/generated';

import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/utils';

import { ProductCheckout } from './-components/ProductCheckout';
import { ProductMeta } from './-components/ProductMeta';
import { ProductOverview } from './-components/ProductOverview';
import { ProductRequirements } from './-components/ProductRequirements';
import { ProductScreenshots } from './-components/ProductScreenshots';
import { ProductSelection } from './-components/ProductSelection';
import { productGames } from './-mocks/productGames';

export const Route = createFileRoute('/(layout)/games/$slug')({
  component: RouteComponent
});

function RouteComponent() {
  const { slug } = Route.useParams();
  const game = productGames.find((productGame) => productGame.slug === slug) ?? productGames[0];
  const [selectedVariant, setSelectedVariant] = useState<PriceVariant>(game.priceVariants[0]);

  return (
    <section className='mt-2 flex flex-col gap-2 sm:pb-2'>
      <Link className='flex h-14 items-center gap-4' to='/'>
        <ChevronLeftIcon className='size-6' />
        <Typography as='p' className='font-medium tracking-normal' variant='title-md'>
          <span className='hidden sm:block'>В каталог</span>
          <span className='block sm:hidden'>{game.name}</span>
        </Typography>
      </Link>

      <div
        className={cn(
          'sm:grid sm:gap-6',
          '[grid-template-areas:"overview"_"screenshots"_"meta"_"requirements"_"selection"_"checkout"]',
          'lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)]',
          'lg:gap-x-6 lg:gap-y-10',
          'lg:[grid-template-areas:"overview_selection_checkout"_"meta_selection_checkout"_"screenshots_screenshots_screenshots"_"requirements_requirements_requirements"]'
        )}
      >
        <section className='[grid-area:overview]'>
          <div className='flex flex-col gap-6 lg:gap-4'>
            <ProductOverview game={game} />
          </div>
        </section>

        <ProductScreenshots className='[grid-area:screenshots]' game={game} />

        <ProductMeta className='[grid-area:meta]' game={game} />

        <ProductRequirements className='[grid-area:requirements]' game={game} />

        <section className='[grid-area:selection]'>
          <ProductSelection
            game={game}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </section>

        <div className='[grid-area:checkout]'>
          <ProductCheckout game={game} priceVariant={selectedVariant} />
        </div>
      </div>
    </section>
  );
}
