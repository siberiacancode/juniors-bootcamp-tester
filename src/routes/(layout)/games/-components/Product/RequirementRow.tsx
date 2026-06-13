import { Typography } from '@/shared/components/ui/typography';

export const RequirementRow = ({ label, value }: { label: string; value: string }) => (
  <div className='flex flex-col'>
    <Typography as='span' className='text-[14px]/5.5 text-muted-fg' variant='caption'>
      {label}
    </Typography>
    <Typography as='span' className='text-[16px]/6 font-medium tracking-normal' variant='body-sm'>
      {value}
    </Typography>
  </div>
);
