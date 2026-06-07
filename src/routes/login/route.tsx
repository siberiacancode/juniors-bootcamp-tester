import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { loginSearchSchema, resolveLoginRedirect } from './-constants';

export const Route = createFileRoute('/login')({
  component: Outlet,
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context, search }) => {
    if (context.user.isLoggedIn) {
      throw redirect({ to: resolveLoginRedirect(search.redirect) });
    }
  }
});
