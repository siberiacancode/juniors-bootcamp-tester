import { Card } from '@/shared/components/ui/card';
import { Typography } from '@/shared/components/ui/typography';
import { cn } from '@/shared/utils';

import type { ProductGame } from '../../-constants';

import { formatProductDate } from '../../-helpers';

interface ProductMetaItem {
  label: string;
  value: string;
}

const productMetaItems = (game: ProductGame): ProductMetaItem[] => [
  {
    label: 'Дата выхода',
    value: formatProductDate(game.releaseDate)
  },
  {
    label: 'Разработчик',
    value: game.developer
  },
  {
    label: 'Издатель',
    value: game.publisher
  },
  {
    label: 'Steam ID',
    value: game.externalId
  }
];

export const ProductMeta = ({ className, game }: { className?: string; game: ProductGame }) => (
  <Card className={cn('gap-2 border-none p-0 sm:rounded-24 sm:bg-secondary sm:p-6', className)}>
    {productMetaItems(game).map((item) => (
      <div key={item.label} className='flex flex-col'>
        <Typography as='span' className='text-[14px]/5.5 text-muted-fg' variant='caption'>
          {item.label}
        </Typography>
        <Typography
          as='span'
          className='text-[16px]/6 font-medium tracking-normal'
          variant='body-sm'
        >
          {item.value}
        </Typography>
      </div>
    ))}
  </Card>
);
