import { useMask } from '@siberiacancode/reactuse';

import { useGetUsersProfileSuspenseQuery } from '@/generated/api';

export const useProfileInfo = () => {
  const getUsersProfileSuspenseQuery = useGetUsersProfileSuspenseQuery();
  const user = getUsersProfileSuspenseQuery.data.data.user;

  const phoneMask = useMask('+9 999 999 99 99', {
    showMask: 'never',
    initialValue: user?.phone
  });

  const displayName = [user.lastname, user.firstname, user.middlename].filter(Boolean).join(' ');
  const phone = phoneMask.watch().displayValue;

  return {
    state: {
      user,
      displayName,
      phone
    }
  };
};
