import { useMediaQuery } from '@siberiacancode/reactuse';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import type { ProductGame } from '../-types';

import { RequirementColumn } from './RequirementColumn';

export const ProductRequirements = ({
  className,
  game
}: {
  className?: string;
  game: ProductGame;
}) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <section className={cn('mb-6 flex flex-col gap-3 sm:mb-0', className)}>
      <Typography className='lg:text-[24px]/8 lg:font-bold' variant='body-md'>
        Системные требования
      </Typography>
      {isDesktop ? (
        <div className='grid gap-4 lg:grid-cols-2'>
          <RequirementColumn requirements={game.minimumSystemRequirements} title='Минимальные' />
          <RequirementColumn
            requirements={game.recommendedSystemRequirements}
            title='Рекомендуемые'
          />
        </div>
      ) : (
        <Tabs defaultValue='minimum'>
          <TabsList className='w-full'>
            <TabsTrigger value='minimum'>Минимальные</TabsTrigger>
            <TabsTrigger value='recommended'>Рекомендуемые</TabsTrigger>
          </TabsList>
          <TabsContent value='minimum'>
            <RequirementColumn requirements={game.minimumSystemRequirements} />
          </TabsContent>
          <TabsContent value='recommended'>
            <RequirementColumn requirements={game.recommendedSystemRequirements} />
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
};
