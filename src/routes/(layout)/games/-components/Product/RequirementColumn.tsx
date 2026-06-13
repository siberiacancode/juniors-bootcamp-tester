import type { SystemRequirements } from '@/shared/api/generated';

import { Typography } from '@/shared/components/ui/typography';

import { getRequirementRows } from '../../-helpers';
import { RequirementRow } from './RequirementRow';

export const RequirementColumn = ({
  requirements,
  title
}: {
  requirements: SystemRequirements;
  title?: string;
}) => (
  <div className='flex flex-col gap-2'>
    {title && (
      <Typography
        as='h3'
        className='pb-1 text-[24px]/8 font-medium tracking-normal'
        variant='title-md'
      >
        {title}
      </Typography>
    )}
    <Typography as='p' className='text-[16px]/6 font-medium lg:hidden' variant='body-sm'>
      64-разрядные процессор и операционная система
    </Typography>
    {getRequirementRows(requirements).map((row) =>
      row.value ? <RequirementRow key={row.label} label={row.label} value={row.value} /> : null
    )}
  </div>
);
