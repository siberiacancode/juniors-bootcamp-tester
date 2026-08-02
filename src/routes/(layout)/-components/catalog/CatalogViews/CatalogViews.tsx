import { ChipGroup, ChipGroupItem } from '@/components/ui/chip-group';
import { IntlText } from '@/lib/intl';
import { cn } from '@/lib/utils';

import { useCatalogViews } from './hooks';

export const CatalogViews = () => {
  const { state, functions } = useCatalogViews();

  return (
    <ChipGroup
      className='max-w-full scrollbar-none justify-start gap-2 overflow-x-auto overflow-y-hidden bg-transparent p-0 [&::-webkit-scrollbar]:hidden'
      type='single'
      value={state.selectedView}
      onValueChange={functions.onViewChange}
    >
      {state.views.map((view) => (
        <ChipGroupItem
          key={view}
          className={cn(
            'h-13 flex-none bg-secondary px-8 text-[20px]/7 font-bold tracking-wide text-foreground shadow-none',
            'data-[state=on]:bg-accent-secondary data-[state=on]:text-accent-secondary-fg data-[state=on]:shadow-none',
            view === 'all' && 'px-4.5'
          )}
          icon={false}
          value={view}
        >
          <IntlText path={`page.catalog.views.${view}`} />
        </ChipGroupItem>
      ))}
    </ChipGroup>
  );
};
