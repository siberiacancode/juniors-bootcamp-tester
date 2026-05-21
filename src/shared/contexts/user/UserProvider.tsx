import { useMemo, useState } from 'react';

import type { User } from '@/shared/api/generated';

import { LOCAL_STORAGE_KEYS } from '@/shared/constants';

import type { UserContextValue } from './UserContext';

import { UserContext } from './UserContext';

export interface UserProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export const UserProvider = ({ children, user: initialUser }: UserProviderProps) => {
  const [user, setUser] = useState(initialUser ?? null);

  const set = (user: User, token?: string) => {
    if (token) localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    setUser(user);
  };

  const remove = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    setUser(null);
  };

  const value = useMemo<UserContextValue>(
    () => ({ value: user, isLoggedIn: !!user, remove, set }),
    [user]
  );

  return <UserContext value={value}>{children}</UserContext>;
};
