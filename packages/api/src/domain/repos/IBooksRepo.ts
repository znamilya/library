import { Either } from "@sweet-monads/either";
import { Book } from "../entities/Book/Book";

export type BookPersistence = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  borrowingIds: string[];
};

export type IBooksRepo = {
  findAll(): Promise<Either<Error, Book[]>>;
  findById(id: string): Promise<Either<Error, Book>>;
  save(book: Book): Promise<Either<Error, boolean>>;
};
