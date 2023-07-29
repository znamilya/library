import { left, right } from "@sweet-monads/either";
import { IAddBookUseCase } from "../domain";
import { Book } from "../domain/entities/Book";
import { NewBookDto } from "../dtos/Book";
import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";

class AddBookUseCase implements IAddBookUseCase {
  private booksRepo: InMemoryBooksRepo;

  constructor(booksRepo: InMemoryBooksRepo) {
    this.booksRepo = booksRepo;
  }

  async execute(bookDto: NewBookDto) {
    const bookOrError = Book.create({
      title: bookDto.title,
      author: bookDto.author,
      isbn: bookDto.isbn,
      borrowingIds: [],
    });

    if (bookOrError.isLeft()) {
      return left(new Error(`Error while creating book. ${bookOrError.value}`));
    }

    const book = bookOrError.value;

    const saveBookResult = await this.booksRepo.save(book);

    if (saveBookResult.isLeft()) {
      return left(new Error(`Can't save book. ${saveBookResult.value}`));
    }

    return right(book);
  }
}

export { AddBookUseCase };
