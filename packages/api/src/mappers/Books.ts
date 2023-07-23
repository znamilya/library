import { BookPersistence } from "../domain/repos/IBooksRepo";
import { Book } from "../domain/entities/Book/Book";

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
    return Book.create(
      {
        title: bookPersistence.title,
        author: bookPersistence.author,
        isbn: bookPersistence.isbn,
        borrowingIds: bookPersistence.borrowingIds,
      },
      bookPersistence.id,
    );
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
