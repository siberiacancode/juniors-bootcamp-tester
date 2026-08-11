import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib';

import type { GamePageState } from '../types';

import { getRequirementRows } from '../../-helpers';

interface GameRequirementsProps {
  isDesktop: GamePageState['isDesktop'];
  sections: GamePageState['requirementSections'];
}

type RequirementSection = GamePageState['requirementSections'][number];

const RequirementRows = ({ section }: { section: RequirementSection }) => (
  <>
    {getRequirementRows(section.requirements).map(
      (row) =>
        row.value && (
          <div key={row.labelPath} className='flex flex-col'>
            <Typography as='span' className='text-muted-fg' variant='caption'>
              <IntlText path={row.labelPath as MessagePath} />:
            </Typography>
            <Typography as='span' variant='body-sm'>
              {row.value}
            </Typography>
          </div>
        )
    )}
  </>
);

export const GameRequirements = ({ isDesktop, sections }: GameRequirementsProps) => (
  <section className='mb-6 flex flex-col gap-3 [grid-area:requirements] sm:mb-0'>
    <Typography variant={isDesktop ? 'title-md' : 'body-md'}>
      <IntlText path='page.gameProduct.systemRequirements' />
    </Typography>
    {isDesktop ? (
      <div className='grid gap-4 lg:grid-cols-2'>
        {sections.map((section) => (
          <div key={section.key} className='flex flex-col gap-2'>
            <Typography as='h3' className='font-medium' variant='title-md'>
              <IntlText path={section.titlePath} />
            </Typography>
            <RequirementRows section={section} />
          </div>
        ))}
      </div>
    ) : (
      <Tabs defaultValue='minimum'>
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
    )}
  </section>
);
