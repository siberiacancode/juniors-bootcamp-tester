const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
});

export const formatProductDate = (timestamp: number): string =>
  dateFormatter.format(new Date(timestamp));
