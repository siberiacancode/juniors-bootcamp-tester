import { use } from 'react';

import { UserContext } from './UserContext';

export const useUser = () => use(UserContext);
