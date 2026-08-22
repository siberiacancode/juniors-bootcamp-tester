import { useDisclosure, useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import {
  getUsersProfileQueryKey,
  useGetUsersProfileSuspenseQuery,
  usePostAuthSignOutMutation
} from '@/generated/api';

export const useProfileInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editDialog = useDisclosure();
  const confirmDialog = useDisclosure();
  const getUsersProfileSuspenseQuery = useGetUsersProfileSuspenseQuery();
  const postAuthSignOutMutation = usePostAuthSignOutMutation();
  const user = getUsersProfileSuspenseQuery.data.data.user;

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user?.phone
  });

  const onLogout = async () => {
    // 🐛 bug
    // first logout confirm click does nothing
    // const logoutClicks =
    //   ((window as typeof window & { __logoutClicks?: number }).__logoutClicks ?? 0) + 1;
    // (window as typeof window & { __logoutClicks?: number }).__logoutClicks = logoutClicks;
    // if (logoutClicks % 2 !== 0) return;

    const authSignOutResponse = await postAuthSignOutMutation.mutateAsync();

    if (!authSignOutResponse.data.success) return;

    navigate({
      to: '/'
    });
    queryClient.removeQueries({
      queryKey: [getUsersProfileQueryKey]
    });
  };

  const displayName = [user.lastname, user.firstname, user.middlename].filter(Boolean).join(' ');
  const phone = phoneMask.watch().displayValue;

  return {
    state: {
      user,
      displayName,
      phone
    },
    features: {
      editDialog,
      confirmDialog
    },
    functions: {
      onLogout
    }
  };
};
