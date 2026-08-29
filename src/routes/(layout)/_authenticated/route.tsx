import { createFileRoute, redirect } from '@tanstack/react-router';

import { getUsersProfileQueryOptions } from '@/generated/api';
import { queryClient } from '@/utils/lib';

export const Route = createFileRoute('/(layout)/_authenticated')({
  beforeLoad: async () => {
    const getUsersProfileResponse = await queryClient.query(
      getUsersProfileQueryOptions({
        params: {
          gcTime: Infinity
        }
      })
    );

    if (!getUsersProfileResponse.data.success || !getUsersProfileResponse.data.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});
