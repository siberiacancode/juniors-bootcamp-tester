import type { SystemRequirements } from '@/generated/api';

import { Typography } from '@/components/ui/typography';

import { getRequirementRows } from '../-helpers';

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
      row.value ? (
        <div key={row.label} className='flex flex-col'>
          <Typography as='span' className='text-[14px]/5.5 text-muted-fg' variant='caption'>
            {row.label}
          </Typography>
          <Typography
            as='span'
            className='text-[16px]/6 font-medium tracking-normal'
            variant='body-sm'
          >
            {row.value}
          </Typography>
        </div>
      ) : null
    )}
  </div>
);
