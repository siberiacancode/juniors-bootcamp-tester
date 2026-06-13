import { Link } from '@tanstack/react-router';
import { ChevronLeftIcon } from 'lucide-react';
import { useState } from 'react';

import { Typography } from '@/shared/components/ui/typography';

import type { ProductGame } from '../../-constants/product';

import { ProductCheckout } from './ProductCheckout';
import { ProductMeta } from './ProductMeta';
import { ProductOverview } from './ProductOverview';
import { ProductRequirements } from './ProductRequirements';
import { ProductScreenshots } from './ProductScreenshots';
import { ProductSelection } from './ProductSelection';

interface ProductPageProps {
  game: ProductGame;
}

export const ProductPage = ({ game }: ProductPageProps) => {
  const [selectedVariant, setSelectedVariant] = useState(game.priceVariants[0]);

  return (
    <section className='mt-2 flex flex-col gap-2 pb-20 sm:pb-2'>
      <Link className='flex h-14 items-center gap-4' to='/'>
        <ChevronLeftIcon className='size-6' />
        <Typography as='p' className='font-medium tracking-normal' variant='title-md'>
          <span className='hidden sm:block'>В каталог</span>
          <span className='block sm:hidden'>{game.name}</span>
        </Typography>
      </Link>

      <div className='flex flex-col gap-10'>
        <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,418px)_minmax(0,372px)] lg:gap-6'>
          <section className='flex flex-col gap-6 lg:gap-4'>
            <ProductOverview game={game} />
            <ProductMeta className='hidden lg:flex' game={game} />
          </section>

          <section className='flex flex-col gap-6 lg:gap-4'>
            <ProductScreenshots className='lg:hidden' game={game} />
            <ProductMeta className='lg:hidden' game={game} />
            <ProductRequirements className='lg:hidden' game={game} />
            <ProductSelection
              game={game}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
            />
          </section>

          <ProductCheckout game={game} priceVariant={selectedVariant} />
        </div>

        <ProductScreenshots className='hidden lg:flex' game={game} />
        <ProductRequirements className='hidden lg:flex' game={game} />
      </div>
    </section>
  );
};
