export const isValid = (input: string) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁґҐєЄіІїЇ0-9\s,./]+$/u; 
  return regex.test(input);
};
