import { useTimer } from '@siberiacancode/reactuse';
import { Button } from '@siberiacancode/uikit';
import { Loader2Icon } from 'lucide-react';

import { IntlText } from '@/utils/lib/intl';

interface CountdownProps {
  loading?: boolean;
  retryAt: number;
  onRetry: () => void;
}

export const Countdown = ({ retryAt, onRetry, loading = false }: CountdownProps) => {
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
    <Button className='w-full' size='lg' type='button' variant='ghost'>
      <IntlText path='page.login.otp.retryCountdown' values={{ seconds }} />
    </Button>
  );
};
