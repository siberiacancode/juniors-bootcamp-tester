import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(layout)/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.user.isLoggedIn) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});
