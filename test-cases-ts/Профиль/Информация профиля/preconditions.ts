type ProfileInfoPreconditions = 'emptyProfile' | 'fullFilledProfile';

export const profileInfoPreconditions: Record<ProfileInfoPreconditions, string[]> = {
  emptyProfile: ['Профиль без ФИО, аватара и email'],
  fullFilledProfile: ['Профиль с заполненными ФИО, аватаром и email']
};
