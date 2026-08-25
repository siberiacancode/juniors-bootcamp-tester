import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import {
  getCardsCardsQueryKey,
  getUsersProfileQueryKey,
  usePostAuthSignOutMutation
} from '@/generated/api';

import { appOverlaysStore } from '../../../store';

export const useLogoutConfirmation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postAuthSignOutMutation = usePostAuthSignOutMutation();

  const onClose = () => appOverlaysStore.get().close();

  const onLogout = async () => {
    const authSignOutResponse = await postAuthSignOutMutation.mutateAsync();

    if (!authSignOutResponse.data.success) return;

    onClose();
    await navigate({
      to: '/'
    });
    queryClient.resetQueries({
      queryKey: [getUsersProfileQueryKey]
    });
    queryClient.resetQueries({
      queryKey: [getCardsCardsQueryKey]
    });
  };

  return {
    state: {
      isPending: postAuthSignOutMutation.isPending
    },
    functions: {
      onClose,
      onLogout
    }
  };
};
