import { left, mergeInOne, right } from "@sweet-monads/either";
import { Book } from "../../domain/entities/Book/Book";
import { BookPersistence, IBooksRepo } from "../../domain/repos/IBooksRepo";
import { BooksMapper } from "../../mappers/Books";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const books: BookPersistence[] = [
  {
    id: "1",
    title: "The Lord of the Rings",
    isbn: "9780261103252",
    author: "J. R. R. Tolkien",
    borrowingIds: [],
  },
  {
    id: "2",
    title: "The Hobbit",
    isbn: "9780544003415",
    author: "J. R. R. Tolkien",
    borrowingIds: [],
  },
  {
    id: "3",
    title: "Harry Potter and the Philosopher's Stone",
    isbn: "9780747532743",
    author: "J. K. Rowling",
    borrowingIds: [],
  },
  {
    id: "4",
    title: "The Hitchhiker's Guide to the Galaxy",
    isbn: "9780345391803",
    author: "Douglas Adams",
    borrowingIds: [],
  },
  {
    id: "5",
    title: "1984",
    isbn: "9780451524935",
    author: "George Orwell",
    borrowingIds: [],
  },
];

class InMemoryBooksRepo implements IBooksRepo {
  async findAll() {
    const booksEntityOrError = books.map(BooksMapper.persistenceToEntity);
    const x = mergeInOne(booksEntityOrError);

    if (x.isLeft()) {
      return left(new Error("Error while mapping books"));
    }

    return right(x.value);
  }

  async findById(id: string) {
    const book = books.find((book) => book.id === id);

    if (!book) {
      return left(new Error("Book not found"));
    }

    const bookEntityOrError = BooksMapper.persistenceToEntity(book);

    if (bookEntityOrError.isLeft()) {
      return left(bookEntityOrError.value);
    }

    return right(bookEntityOrError.value);
  }

  async save(book: Book) {
    const index = books.findIndex((b) => b.id === book.id);

    if (index === -1) {
      books.push(BooksMapper.entityToPersistence(book));
    } else {
      books[index] = BooksMapper.entityToPersistence(book);
    }

    return right(true);
  }
}

export { InMemoryBooksRepo };
