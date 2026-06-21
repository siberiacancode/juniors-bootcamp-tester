export const FOOTER_PRODUCTS = [
  {
    search: {
      filter: [],
      genre: [],
      view: undefined
    },
    to: '/',
    label: 'Весь каталог'
  },
  {
    search: {
      filter: [],
      genre: [],
      view: 'new'
    },
    to: '/',
    label: 'Новинки'
  },
  {
    search: {
      filter: [],
      genre: [],
      view: 'popular'
    },
    to: '/',
    label: 'Популярные'
  }
] as const;

export const FOOTER_CONTACTS = [
  {
    href: '/profile',
    label: 'Поддержка клиентов'
  },
  {
    href: '/profile',
    label: 'Написать нам на почту'
  },
  {
    href: '/profile',
    label: 'По вопросам рекламы'
  },
  {
    href: '/profile',
    label: 'Контакты'
  }
] as const;

export const FOOTER_REPOSITORY_URL = 'https://github.com/siberiacancode/juniors-bootcamp-tester';
