import { createContext } from 'react';

import type { User } from '@/shared/api/generated';

export interface UserContextValue {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  user: null,
  setUser: () => {}
});
