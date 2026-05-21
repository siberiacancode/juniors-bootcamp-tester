import { createContext } from 'react';

import type { User } from '@/shared/api/generated';

export interface UserContextValue {
  isLoggedIn: boolean;
  value: User | null;
  remove: () => void;
  set: (user: User, token?: string) => void;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  value: null,
  set: () => {},
  remove: () => {}
});
