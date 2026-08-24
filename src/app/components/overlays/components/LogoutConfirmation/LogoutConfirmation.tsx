import { Button } from '@siberiacancode/uikit';
import { Loader2Icon } from 'lucide-react';

import { QuestionMarkIcon } from '@/components/icons/system';
import { Modal } from '@/components/ui/modal';
import { IntlText } from '@/utils/lib/intl';

import { useLogoutConfirmation } from './hooks';

export const LogoutConfirmation = () => {
  const { state, functions } = useLogoutConfirmation();

  return (
    <Modal
      icon={<QuestionMarkIcon />}
      title={<IntlText path='modal.logout.title' />}
      onOpenChange={functions.onClose}
    >
      <div className='flex flex-col gap-4'>
        <Button
          disabled={state.isPending}
          size='lg'
          type='button'
          variant='secondary'
          onClick={functions.onClose}
        >
          <IntlText path='button.cancel' />
        </Button>
        <Button disabled={state.isPending} size='lg' type='button' onClick={functions.onLogout}>
          {state.isPending && <Loader2Icon className='animate-spin' />}
          <IntlText path='button.logout' />
        </Button>
      </div>
    </Modal>
  );
};
