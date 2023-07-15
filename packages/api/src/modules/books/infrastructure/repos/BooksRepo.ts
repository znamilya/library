import { BookDto } from "../../dtos/Book";

export type BooksRepo = {
  findAll: () => Promise<BookDto[]>;
};
