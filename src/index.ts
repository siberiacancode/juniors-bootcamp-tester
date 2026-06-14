declare global {
  type Locale = 'ru';
  type MessagePath = keyof typeof import('../static/ru.json');

  // eslint-disable-next-line ts/no-namespace
  namespace FormatjsIntl {
    interface IntlConfig {
      locale: Locale;
    }

    interface Message {
      ids: MessagePath;
    }
  }
}

export {};
