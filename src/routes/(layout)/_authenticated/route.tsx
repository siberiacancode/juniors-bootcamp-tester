import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft';

import { createFileRoute, redirect } from '@tanstack/react-router';

import type { GetProfileResponse } from '@/generated/api';

import { getUsersProfileQueryKey } from '@/generated/api';
import { queryClient } from '@/lib';

export const Route = createFileRoute('/(layout)/_authenticated')({
  beforeLoad: () => {
    const usersProfileResponse = queryClient.getQueryData<ApicraftFetchesResponse<GetProfileResponse>>(
      [getUsersProfileQueryKey]
    );
    const user = usersProfileResponse?.data.user;

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
