import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/utils';

interface PurchaseHistoryBadgeProps {
  children: string;
  className?: string;
}

export const PurchaseHistoryBadge = ({ className, children }: PurchaseHistoryBadgeProps) => (
  <Badge
    className={cn(
      'min-h-6 px-4 py-2 text-[12px]/4 font-bold sm:px-4 sm:py-2 sm:text-[14px]/5',
      className
    )}
  >
    {children}
  </Badge>
);
