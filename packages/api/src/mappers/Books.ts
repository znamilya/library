import { Book } from "../domain/entities/Book/Book";
import { BookPersistence } from "../domain/repos/IBooksRepo";

class BooksMapper {
  static entityToPersistence(book: Book): BookPersistence {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      borrowingIds: book.borrowingIds,
    };
  }

  static persistenceToEntity(bookPersistence: BookPersistence): Book {
    const book = Book.create(
      {
        title: bookPersistence.title,
        author: bookPersistence.author,
        isbn: bookPersistence.isbn,
        borrowingIds: bookPersistence.borrowingIds,
      },
      bookPersistence.id,
    );

    return book.value as Book;
  }

  static entityToDto(book: Book): any {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      borrowingIds: book.borrowingIds,
    };
  }
}

export { BooksMapper };
