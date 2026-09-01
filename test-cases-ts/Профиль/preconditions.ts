type ProfilePrecondition = 'userWithFullName' | 'userWithoutFullName';

export const profilePreconditions: Record<ProfilePrecondition, string[]> = {
  userWithFullName: ['Пользователь с заполненным ФИО'],
  userWithoutFullName: ['Пользователь без заполненного ФИО']
} as const;
