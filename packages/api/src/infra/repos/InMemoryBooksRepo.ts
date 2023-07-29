import { left, mergeInOne, right } from "@sweet-monads/either";
import { Book } from "../../domain/entities/Book/Book";
import { BookPersistence, IBooksRepo } from "../../domain/repos/IBooksRepo";
import { BooksMapper } from "../../mappers/Books";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const books: BookPersistence[] = [
  {
    id: "1",
    title: "The Lord of the Rings",
    isbn: "9992158107",
    author: "J. R. R. Tolkien",
    borrowingIds: [],
  },
  {
    id: "2",
    title: "The Hobbit",
    isbn: "9971502100",
    author: "J. R. R. Tolkien",
    borrowingIds: [],
  },
  {
    id: "3",
    title: "Harry Potter and the Philosopher's Stone",
    isbn: "9604250590",
    author: "J. K. Rowling",
    borrowingIds: [],
  },
  {
    id: "4",
    title: "The Hitchhiker's Guide to the Galaxy",
    isbn: "8090273416",
    author: "Douglas Adams",
    borrowingIds: [],
  },
  {
    id: "5",
    title: "1984",
    isbn: "007462542X",
    author: "George Orwell",
    borrowingIds: [],
  },
];

class InMemoryBooksRepo implements IBooksRepo {
  books: BookPersistence[] = [];

  constructor(initialBooks: BookPersistence[] = []) {
    this.books = initialBooks;
  }

  async findAll() {
    const booksEntityOrError = this.books.map(BooksMapper.persistenceToEntity);
    const x = mergeInOne(booksEntityOrError);

    if (x.isLeft()) {
      return left(new Error("Error while mapping books"));
    }

    return right(x.value);
  }

  async findByTitle(title: string) {
    const booksEntityOrError = this.books
      .filter((book) => book.title.toLowerCase().includes(title.toLowerCase()))
      .map(BooksMapper.persistenceToEntity);

    const x = mergeInOne(booksEntityOrError);

    if (x.isLeft()) {
      return left(new Error("Error while mapping books"));
    }

    return right(x.value);
  }

  async findById(bookId: string) {
    const book = this.books.find((book) => book.id === bookId);

    if (!book) {
      return left(new Error("Book not found"));
    }

    const bookEntityOrError = BooksMapper.persistenceToEntity(book);

    if (bookEntityOrError.isLeft()) {
      return left(bookEntityOrError.value);
    }

    return right(bookEntityOrError.value);
  }

  private async findBy(predicate: (book: BookPersistence) => boolean) {
    return books.find((book) => predicate(book));
  }

  async removeById(bookId: string) {
    const index = this.books.findIndex((book) => book.id === bookId);
    const book = this.books[index];

    if (!book) {
      return left(new Error("Book not found"));
    }

    this.books.splice(index, 1);

    const bookEntityOrError = BooksMapper.persistenceToEntity(book);

    if (bookEntityOrError.isLeft()) {
      return left(bookEntityOrError.value);
    }

    return right(bookEntityOrError.value);
  }

  async save(newBook: Book) {
    const existingBook = await this.findBy((book) => book.isbn === newBook.isbn);

    if (existingBook) {
      return left(new Error(`Book with ISBN ${newBook.isbn} already exists`));
    }

    const index = this.books.findIndex((b) => b.id === newBook.id);

    if (index === -1) {
      this.books.push(BooksMapper.entityToPersistence(newBook));
    } else {
      this.books[index] = BooksMapper.entityToPersistence(newBook);
    }

    return right(true);
  }
}

export { InMemoryBooksRepo };
