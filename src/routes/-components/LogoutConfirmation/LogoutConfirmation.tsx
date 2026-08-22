import { Button } from '@siberiacancode/uikit';

import type { ModalProps } from '@/components/ui/modal';

import { QuestionMarkIcon } from '@/components/icons/system';
import { Modal } from '@/components/ui/modal';
import { IntlText } from '@/utils/lib/intl';

interface LogoutConfirmationProps extends ModalProps {
  onConfirm: () => void;
}

export const LogoutConfirmation = ({ onConfirm, onOpenChange }: LogoutConfirmationProps) => (
  <Modal
    icon={<QuestionMarkIcon />}
    title={<IntlText path='modal.logout.title' />}
    onOpenChange={onOpenChange}
  >
    <div className='flex flex-col gap-4'>
      <Button size='lg' type='button' variant='secondary' onClick={() => onOpenChange(false)}>
        <IntlText path='button.cancel' />
      </Button>
      <Button
        size='lg'
        type='button'
        onClick={() => {
          onOpenChange(false);
          onConfirm();
        }}
      >
        <IntlText path='button.logout' />
      </Button>
    </div>
  </Modal>
);
