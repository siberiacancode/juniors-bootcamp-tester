import { createPreconditions } from '../(utils)';

export const profilePreconditions = createPreconditions({
  pageOpened: ['Открыта страница "/profile"'],
  userWithSavedCards: ['Пользователь с несколькими сохранёнными картами'],
  cardsOpened: ['Открыта вкладка "Карты"'],
  emptyProfile: ['Профиль без ФИО, аватара и email'],
  fullFilledProfile: ['Профиль с заполненными ФИО, аватаром и email']
});
