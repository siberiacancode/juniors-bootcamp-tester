import { Button } from '@siberiacancode/uikit';
import { Loader2Icon } from 'lucide-react';

import { QuestionMarkIcon } from '@/components/icons/system';
import { Modal } from '@/components/ui/modal';
import { TESTIDS } from '@/generated/tests/index.gen';
import { IntlText } from '@/utils/lib/intl';

import { useDeletePaymentCardConfirmation } from './hooks';

interface DeletePaymentCardConfirmationProps {
  cardId: string;
}

export const DeletePaymentCardConfirmation = ({ cardId }: DeletePaymentCardConfirmationProps) => {
  const { state, functions } = useDeletePaymentCardConfirmation({ cardId });

  return (
    <Modal
      icon={<QuestionMarkIcon />}
      title={<IntlText path='modal.deletePaymentCard.title' />}
      onOpenChange={functions.onClose}
    >
      <div className='flex flex-col gap-4' data-testid={TESTIDS.STATIC.MODAL.DELETE_PAYMENT_CARD}>
        <Button
          data-testid={TESTIDS.CLICKABLE.BUTTON.CANCEL}
          disabled={state.isPending}
          size='lg'
          type='button'
          variant='secondary'
          onClick={functions.onClose}
        >
          <IntlText path='button.cancel' />
        </Button>
        <Button
          data-testid={TESTIDS.CLICKABLE.BUTTON.DELETE}
          disabled={state.isPending}
          size='lg'
          type='button'
          onClick={functions.onDelete}
        >
          {state.isPending && <Loader2Icon className='animate-spin' />}
          <IntlText path='button.delete' />
        </Button>
      </div>
    </Modal>
  );
};
