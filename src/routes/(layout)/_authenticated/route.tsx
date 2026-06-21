import type { ApicraftFetchesResponse } from '@siberiacancode/apicraft';

import { createFileRoute, redirect } from '@tanstack/react-router';

import type { SessionResponse } from '@/generated/api';

import { getUsersSessionQueryKey } from '@/generated/api';
import { queryClient } from '@/lib';

export const Route = createFileRoute('/(layout)/_authenticated')({
  beforeLoad: () => {
    const usersSessionResponse = queryClient.getQueryData<ApicraftFetchesResponse<SessionResponse>>(
      [getUsersSessionQueryKey]
    );
    const user = usersSessionResponse?.data.user;

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
