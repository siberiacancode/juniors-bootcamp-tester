import { useTimer } from '@siberiacancode/reactuse';
import { Button } from '@siberiacancode/uikit';
import { Loader2Icon } from 'lucide-react';

import { TESTIDS } from '@/generated/tests/ids.gen';
import { IntlText } from '@/utils/lib/intl';

interface CountdownProps {
  loading?: boolean;
  retryAt: number;
  onRetry: () => void;
}

export const Countdown = ({ retryAt, onRetry, loading = false }: CountdownProps) => {
  const timer = useTimer(Math.max(0, Math.ceil((retryAt - Date.now()) / 1000)));
  const seconds = timer.seconds + timer.minutes * 60;

  if (!seconds)
    return (
      <Button
        className='w-full'
        data-testid={TESTIDS.CLICKABLE.BUTTON.RETRY}
        disabled={loading}
        size='lg'
        type='button'
        variant='secondary'
        onClick={onRetry}
      >
        {loading && <Loader2Icon className='animate-spin' />}
        <IntlText path='button.retryOtp' />
      </Button>
    );

  return (
    <Button
      disabled
      className='w-full'
      data-testid={TESTIDS.CLICKABLE.BUTTON.RETRY}
      size='lg'
      type='button'
      variant='ghost'
    >
      <IntlText path='button.retryOtpCountdown' values={{ seconds }} />
    </Button>
  );
};
