import { useTimer } from '@siberiacancode/reactuse';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Typography } from '@/shared/components/ui/typography';

interface CountdownProps {
  endTime: number;
  loading?: boolean;
  onRetry: () => void;
}

export const Countdown = ({ endTime, onRetry, loading = false }: CountdownProps) => {
  // eslint-disable-next-line react-hooks/purity
  const timer = useTimer(Math.floor(endTime - Date.now()));
  const seconds = timer.seconds + timer.minutes * 60;

  if (!seconds)
    return (
      <Button size='lg' variant='secondary' onClick={onRetry}>
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
