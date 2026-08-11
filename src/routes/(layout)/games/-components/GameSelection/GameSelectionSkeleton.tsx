import { Skeleton } from '@/components/ui/skeleton';

export const GameSelectionSkeleton = () => (
  <>
    {Array.from({ length: 3 }, (_, group) => (
      <div key={group} className='flex flex-col gap-3'>
        <Skeleton className='h-6 w-48 rounded-24 bg-muted-fg/30' />
        <div className='flex flex-col gap-2'>
          {Array.from({ length: group === 0 ? 3 : 2 }, (_, item) => (
            <Skeleton key={item} className='h-16 w-full rounded-24 bg-secondary' />
          ))}
        </div>
      </div>
    ))}
  </>
);
