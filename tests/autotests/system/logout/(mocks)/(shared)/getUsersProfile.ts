import { rest } from 'mock-config-server';

import type { GetProfileResponse } from '@/generated/api';

import { createGetProfileResponseFake } from '@/generated/api';

export const getUsersProfileSuccess = rest.get<{
  response: GetProfileResponse;
}>('/users/profile', createGetProfileResponseFake());
