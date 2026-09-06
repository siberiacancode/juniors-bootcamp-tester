type ProfilePrecondition = 'pageOpened' | 'userWithSavedCards';

export const profilePreconditions: Record<ProfilePrecondition, string[]> = {
  pageOpened: ['Открыта страница "/profile"'],
  userWithSavedCards: ['Пользователь с несколькими сохранёнными картами']
} as const;
