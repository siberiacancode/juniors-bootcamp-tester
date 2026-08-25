import { useQueryClient } from '@tanstack/react-query';

import { getCardsCardsQueryKey, useDeleteCardsCardByIdMutation } from '@/generated/api';

import { appOverlaysStore } from '../../../store';

interface UseDeletePaymentCardConfirmationParams {
  cardId: string;
}

export const useDeletePaymentCardConfirmation = ({
  cardId
}: UseDeletePaymentCardConfirmationParams) => {
  const queryClient = useQueryClient();
  const deleteCardsCardByIdMutation = useDeleteCardsCardByIdMutation();

  const onClose = () => appOverlaysStore.get().close();

  const onDelete = async () => {
    const deleteCardsCardByIdResponse = await deleteCardsCardByIdMutation.mutateAsync({
      path: {
        id: cardId
      }
    });

    if (!deleteCardsCardByIdResponse.data.success) return;

    await queryClient.refetchQueries({
      queryKey: [getCardsCardsQueryKey]
    });
    onClose();
  };

  return {
    state: {
      isPending: deleteCardsCardByIdMutation.isPending
    },
    functions: {
      onClose,
      onDelete
    }
  };
};
