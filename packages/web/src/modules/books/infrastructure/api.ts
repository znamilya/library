import axios from "axios";

import { MemberId } from "@/modules/members";
import { Book, BookId } from "../domain";

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>("http://localhost:1235/api/v1/books");

  return response.data;
};

export const getBookById = async (bookId: BookId): Promise<Book> => {
  const response = await axios.get<Book>(`https://jsonplaceholder.typicode.com/todos/${bookId}`);

  return response.data;
};

type AddBookParams = {
  title: string;
  author: string;
  isbn: string;
};

export const addBook = async (params: AddBookParams): Promise<Book> => {
  const response = await axios.post<Book>("http://localhost:1235/api/v1/books", params);

  return response.data;
};

export type CheckInBookParams = {
  bookId: BookId;
  memberId: MemberId;
};

export const checkInBook = async (params: CheckInBookParams): Promise<void> => {
  const response = await axios.post<void>("http://localhost:1235/api/v1/books/checkin", params);

  return response.data;
};
