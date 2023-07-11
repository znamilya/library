import { Book, BookId } from "../../domain";

export type FindAllBooks = () => Book[] | undefined;

export type FindBookById = (bookId: BookId) => Book | null | undefined;

export type SaveBook = (bookId: BookId) => void;
