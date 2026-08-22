import { Typography } from '@siberiacancode/uikit';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IntlText } from '@/utils/lib';

import type { GamePageState } from '../types';

import { getRequirementRows } from '../../-helpers';

interface GameRequirementsProps {
  sections: GamePageState['requirementSections'];
}

type RequirementSection = GamePageState['requirementSections'][number];

const RequirementRows = ({ section }: { section: RequirementSection }) => (
  <>
    {getRequirementRows(section.requirements).map(
      (row) =>
        row.value && (
          <div key={row.label} className='flex flex-col'>
            <Typography as='span' className='text-muted-fg' variant='caption'>
              <IntlText path={row.label as MessagePath} />:
            </Typography>
            <Typography as='span' variant='body-sm'>
              {row.value}
            </Typography>
          </div>
        )
    )}
  </>
);

export const GameRequirements = ({ sections }: GameRequirementsProps) => (
  <section className='mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0'>
    <Typography className='md:text-[24px]/8 md:font-bold md:tracking-wide' variant='body-md'>
      <IntlText path='page.gameProduct.systemRequirements' />
    </Typography>
    <div className='hidden gap-4 md:grid lg:grid-cols-2'>
      {sections.map((section) => (
        <div key={section.key} className='flex flex-col gap-2'>
          <Typography as='h3' className='font-medium' variant='title-md'>
            <IntlText path={section.titlePath} />
          </Typography>
          <RequirementRows section={section} />
        </div>
      ))}
    </div>
    <Tabs className='md:hidden' defaultValue='minimum'>
      <TabsList className='w-full'>
        {sections.map((section) => (
          <TabsTrigger key={section.key} value={section.key}>
            <IntlText path={section.titlePath} />
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent key={section.key} value={section.key}>
          <div className='flex flex-col gap-2'>
            <RequirementRows section={section} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </section>
);
