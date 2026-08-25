import { ChipGroup, ChipGroupItem } from '@siberiacancode/uikit';

import { IntlText } from '@/utils/lib/intl';
import { cn } from '@/utils/lib/utils';

import type { CatalogView } from './hooks';

import { useCatalogViews } from './hooks';

export const CatalogViews = () => {
  const { state, functions } = useCatalogViews();

  return (
    <ChipGroup
      className='max-w-full scrollbar-none justify-start gap-2 overflow-x-auto overflow-y-hidden bg-transparent p-0 [&::-webkit-scrollbar]:hidden'
      type='single'
      value={state.selectedView}
      onValueChange={(value) => functions.onViewChange(value as CatalogView)}
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
