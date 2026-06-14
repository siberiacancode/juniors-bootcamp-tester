import { Link } from '@tanstack/react-router';

import { Typography } from '@/components/ui/typography';

interface FooterLinkGroupProps {
  className?: string;
  items: ReadonlyArray<{
    href: string;
    label: string;
  }>;
  title: string;
}

export const FooterLinkGroup = ({ items, title, className }: FooterLinkGroupProps) => (
  <div className={`flex flex-col gap-6 ${className}`}>
    <Typography as='h2' className='text-[18px]/6.5 tracking-normal' variant='body-md'>
      {title}
    </Typography>
    <ul className='flex flex-col gap-4'>
      {items.map((item) => (
        <li key={item.label}>
          <Link className='text-[14px]/[22px] font-medium hover:opacity-70' to={item.href}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
