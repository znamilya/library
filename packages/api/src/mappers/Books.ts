import { Book } from "../domain/entities/Book/Book";
import { BookPersistence } from "../domain/repos/IBooksRepo";
import { BookDto } from "../dtos/Book";

class BooksMapper {
  static entityToPersistence(book: Book): BookPersistence {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn.value,
      isRemoved: book.isRemoved,
    };
  }

  static persistenceToEntity(bookPersistence: BookPersistence): Book {
    const book = Book.create(
      {
        title: bookPersistence.title,
        author: bookPersistence.author,
        isbn: bookPersistence.isbn,
        isRemoved: bookPersistence.isRemoved,
      },
      bookPersistence.id,
    );

    return book.value as Book;
  }

  static entityToDto(book: Book): BookDto {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn.value,
    };
  }
}

export { BooksMapper };
