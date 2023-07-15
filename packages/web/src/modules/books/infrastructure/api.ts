import axios from "axios";

import { Book, BookId } from "../domain";

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>("http://localhost:1235/api/v1/books");

  return response.data;
};

export const getBookById = async (bookId: BookId): Promise<Book> => {
  console.log(bookId);
  const response = await axios.get<Book>(`https://jsonplaceholder.typicode.com/todos/${bookId}`);

  return response.data;
};
