import { createFileRoute, redirect } from '@tanstack/react-router';

import { getUsersSessionQueryOptions } from '@/generated/api';

export const Route = createFileRoute('/(layout)/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const user = (await context.queryClient.ensureQueryData(getUsersSessionQueryOptions())).data
      .user;

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
