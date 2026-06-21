import { useDisclosure, useMask } from '@siberiacancode/reactuse';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import {
  getUsersSessionQueryKey,
  useGetGamesOrdersSuspenseQuery,
  useGetUsersSessionQuery
} from '@/generated/api';
import { LOCAL_STORAGE_KEYS } from '@/helpers/constants';

export const useProfilePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const editDialog = useDisclosure();
  const confirmDialog = useDisclosure();

  const getGamesOrdersSuspenseQuery = useGetGamesOrdersSuspenseQuery();
  const getUsersSessionSuspenseQuery = useGetUsersSessionQuery();
  const user = getUsersSessionSuspenseQuery.data!.data.user;

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user?.phone
  });

  const onLogout = () => {
    navigate({
      to: '/'
    });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    queryClient.removeQueries({
      queryKey: [getUsersSessionQueryKey]
    });
  };

  const displayName = [user.lastname, user.firstname, user.middlename].filter(Boolean).join(' ');
  const phone = phoneMask.watch().displayValue;

  return {
    state: {
      user,
      orders: getGamesOrdersSuspenseQuery.data.data.orders,
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
