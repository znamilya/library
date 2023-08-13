import { Either, left, right } from "@sweet-monads/either";
import { Book } from "../../domain/entities/Book/Book";
import { BookPersistence, IBooksRepo } from "../../domain/repos/IBooksRepo";
import { BooksMapper } from "../../mappers/Books";
import { DbContext } from "./InMemory/types";

class InMemoryBooksRepo implements IBooksRepo {
  constructor(private dbContext: DbContext) {}

  async findAll() {
    const { books } = this.dbContext;

    return right(books.map(BooksMapper.persistenceToEntity));
  }

  async findByTitle(title: string) {
    const books = this.dbContext.books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase()),
    );

    return right(books.map(BooksMapper.persistenceToEntity));
  }

  async findById(bookId: string) {
    const book = this.dbContext.books.find((book) => book.id === bookId);

    if (!book) {
      return left(new Error("Book not found"));
    }

    return right(BooksMapper.persistenceToEntity(book));
  }

  private async findBy(predicate: (book: BookPersistence) => boolean) {
    return this.dbContext.books.find((book) => predicate(book));
  }

  async removeById(bookId: string) {
    const index = this.dbContext.books.findIndex((book) => book.id === bookId);
    const book = this.dbContext.books[index];

    if (!book) {
      return left(new Error("Book not found"));
    }

    this.dbContext.books.splice(index, 1);

    return right(BooksMapper.persistenceToEntity(book));
  }

  async save(newBook: Book) {
    const index = this.dbContext.books.findIndex((b) => b.id === newBook.id);

    if (index === -1) {
      this.dbContext.books.push(BooksMapper.entityToPersistence(newBook));
    } else {
      this.dbContext.books[index] = BooksMapper.entityToPersistence(newBook);
    }

    return right(true);
  }

  async create(newBook: Book) {
    const existingBook = await this.findBy((book) => book.isbn === newBook.isbn);

    if (existingBook) {
      return left(new Error(`Book with ISBN ${newBook.isbn} already exists`));
    }

    const index = this.dbContext.books.findIndex((b) => b.id === newBook.id);

    if (index === -1) {
      this.dbContext.books.push(BooksMapper.entityToPersistence(newBook));
    } else {
      this.dbContext.books[index] = BooksMapper.entityToPersistence(newBook);
    }

    return right(true);
  }

  update(book: Book): Promise<Either<Error, boolean>> {
    throw new Error("Method not implemented.");
  }
}

export { InMemoryBooksRepo };
