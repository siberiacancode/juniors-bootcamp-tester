import { useTimer } from '@siberiacancode/reactuse';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';

interface CountdownProps {
  loading?: boolean;
  retryDelay: number;
  onRetry: () => void;
}

export const Countdown = ({ retryDelay, onRetry, loading = false }: CountdownProps) => {
  const timer = useTimer(retryDelay);
  const seconds = timer.seconds + timer.minutes * 60;

  if (!seconds)
    return (
      <Button className='w-full' size='lg' type='button' variant='secondary' onClick={onRetry}>
        {loading && <Loader2Icon className='animate-spin' />}
        Отправить код повторно
      </Button>
    );

  return (
    <Typography as='p' variant='caption'>
      Отправить код повторно через {seconds} секунд
    </Typography>
  );
};
