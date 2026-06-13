import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { cn } from '@/shared/utils';

import type { CatalogView } from '../../-constants/catalog';

import { CATALOG_VIEWS } from '../../-constants/catalog';

interface CatalogViewTabsProps {
  value: CatalogView;
  onChange: (value: CatalogView) => void;
}

export const CatalogViewTabs = ({ onChange, value }: CatalogViewTabsProps) => {
  const onValueChange = (nextValue: string) => {
    const nextView = CATALOG_VIEWS.find((view) => view.value === nextValue)?.value;

    if (nextView) {
      onChange(nextView);
    }
  };

  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className='max-w-full scrollbar-none justify-start gap-3 overflow-x-auto overflow-y-hidden bg-transparent p-0 lg:gap-2 [&::-webkit-scrollbar]:hidden'>
        {CATALOG_VIEWS.map((view) => (
          <TabsTrigger
            key={view.value}
            className={cn(
              'h-19 flex-none bg-secondary px-8 text-[26px]/8 font-extrabold tracking-normal text-foreground shadow-none',
              'data-[state=active]:bg-accent-secondary data-[state=active]:text-accent-secondary-fg data-[state=active]:shadow-none',
              'lg:h-10 lg:px-6 lg:text-[14px]/5'
            )}
            value={view.value}
          >
            {view.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
