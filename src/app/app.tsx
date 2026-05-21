import { RouterProvider } from '@tanstack/react-router';

import { useUser } from '@/shared/contexts/user';

import { router } from './router';

export const App = () => {
  const user = useUser();

  return <RouterProvider context={{ user }} router={router} />;
};
