import fetches from '@siberiacancode/fetches';

export const instance = fetches.create({
  baseURL: '/api/tester',
  validateStatus: (status) => status < 500
});
