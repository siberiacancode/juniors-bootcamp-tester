import fetches from '@siberiacancode/fetches';

import { API_URL } from '@/shared/config/env';

import { LOCAL_STORAGE_KEYS } from '../constants';

export const instance = fetches.create({
  baseURL: API_URL,
  validateStatus: (status) => status < 500
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  if (token && config.headers) config.headers.authorization = `Bearer ${token}`;
  return config;
});
