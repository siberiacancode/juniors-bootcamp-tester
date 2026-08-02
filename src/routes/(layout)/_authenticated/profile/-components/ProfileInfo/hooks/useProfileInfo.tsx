import { useDisclosure, useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { getUsersProfileQueryKey, useGetUsersProfileSuspenseQuery } from '@/generated/api';
import { LOCAL_STORAGE_KEYS } from '@/helpers/constants';

export const useProfileInfo = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editDialog = useDisclosure();
  const confirmDialog = useDisclosure();
  const getUsersProfileSuspenseQuery = useGetUsersProfileSuspenseQuery();
  const user = getUsersProfileSuspenseQuery.data.data.user;

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user?.phone
  });

  const onLogout = () => {
    // 🐛 bug
    // first logout confirm click does nothing
    const logoutClicks =
      ((window as typeof window & { __logoutClicks?: number }).__logoutClicks ?? 0) + 1;
    (window as typeof window & { __logoutClicks?: number }).__logoutClicks = logoutClicks;
    if (logoutClicks % 2 !== 0) return;

    navigate({
      to: '/'
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
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
