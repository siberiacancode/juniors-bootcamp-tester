import type { ModalProps } from '@/components/ui/modal';

import { QuestionMarkIcon } from '@/components/icons/system';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { IntlText } from '@/lib/intl';

interface LogoutConfirmationProps extends ModalProps {
  onConfirm: () => void;
}

export const LogoutConfirmation = ({ onConfirm, onOpenChange }: LogoutConfirmationProps) => {
  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  return (
    <Modal
      icon={<QuestionMarkIcon />}
      title={<IntlText path='modal.logout.title' />}
      onOpenChange={onOpenChange}
    >
      <div className='flex flex-col gap-4'>
        <Button size='lg' type='button' variant='secondary' onClick={() => onOpenChange(false)}>
          <IntlText path='button.logout.cancel' />
        </Button>
        <Button size='lg' type='button' onClick={handleConfirm}>
          <IntlText path='button.logout.confirm' />
        </Button>
      </div>
    </Modal>
  );
};
