import { useTimer } from '@siberiacancode/reactuse';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { IntlText } from '@/lib/intl';

interface CountdownProps {
  loading?: boolean;
  retryAt: number;
  onRetry: () => void;
}

export const Countdown = ({ retryAt, onRetry, loading = false }: CountdownProps) => {
  // eslint-disable-next-line react-hooks/purity
  const timer = useTimer(Math.floor((retryAt - Date.now()) / 1000));
  const seconds = timer.seconds + timer.minutes * 60;

  if (!seconds)
    return (
      <Button className='w-full' size='lg' type='button' variant='secondary' onClick={onRetry}>
        {loading && <Loader2Icon className='animate-spin' />}
        <IntlText path='button.retryOtp' />
      </Button>
    );

  return (
    <Typography as='p' variant='caption'>
      <IntlText path='page.login.otp.retryCountdown' values={{ seconds }} />
    </Typography>
  );
};
