import { createFileRoute, redirect } from '@tanstack/react-router';

import { getUsersProfileQueryOptions } from '@/generated/api';
import { queryClient } from '@/utils/lib';

export const Route = createFileRoute('/(layout)/_authenticated')({
  beforeLoad: () => {
    const getUsersProfileResponse = queryClient.getQueryData(
      getUsersProfileQueryOptions().queryKey
    );
    const user = getUsersProfileResponse?.data.user;

    if (!user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});
