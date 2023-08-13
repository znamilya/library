export type ISBN = string;

export const isValidIsbn = (isbn: string): boolean => {
  return isbn.length === 13;
};
