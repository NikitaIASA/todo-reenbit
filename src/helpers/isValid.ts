export const isValid = (input: string) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s]+$/u;
  return regex.test(input);
};
