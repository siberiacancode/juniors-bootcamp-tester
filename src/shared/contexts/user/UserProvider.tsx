import { useMemo, useState } from 'react';

import type { User } from '@/shared/api/generated';

import type { UserContextValue } from './UserContext';

import { UserContext } from './UserContext';

export interface UserProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export const UserProvider = ({ children, user: initialUser }: UserProviderProps) => {
  const [user, setUser] = useState(initialUser ?? null);

  const value = useMemo<UserContextValue>(() => ({ user, isLoggedIn: !!user, setUser }), [user]);

  return <UserContext value={value}>{children}</UserContext>;
};
