export const formatPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  const normalizedDigits =
    digits.length === 11 && digits.startsWith('8') ? `7${digits.slice(1)}` : digits;

  if (normalizedDigits.length !== 11 || !normalizedDigits.startsWith('7')) {
    return phone;
  }

  return `+7 ${normalizedDigits.slice(1, 4)} ${normalizedDigits.slice(4, 7)} ${normalizedDigits.slice(7, 9)} ${normalizedDigits.slice(9)}`;
};
