import type { UpdateProfileDto, User } from '@/generated/api';

export const AUTHORIZATION_TOKEN = 'profile-edit-authorization-token';
export const PROFILE_UPDATED_COOKIE = 'profile-edit-success-updated';

export const INITIAL_USER = {
  _id: 'profile-user-id',
  phone: '77777777777',
  firstname: 'Иван',
  middlename: 'Иванович',
  lastname: 'Иванов',
  email: 'ivanov@example.com'
} satisfies User;

export const UPDATED_PROFILE = {
  firstname: 'Пётр',
  middlename: 'Петрович',
  lastname: 'Петров',
  email: 'petrov@example.com'
} satisfies UpdateProfileDto;

export const UPDATED_USER = {
  ...INITIAL_USER,
  ...UPDATED_PROFILE
} satisfies User;
