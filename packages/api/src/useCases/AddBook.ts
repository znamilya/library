import { left, right } from "@sweet-monads/either";
import { Book } from "../domain/entities/Book";
import { NewBookDto } from "../dtos/Book";
import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";
import { BaseUseCase } from "../shared/application/BaseUseCase";

class AddBookUseCase extends BaseUseCase {
  private booksRepo: InMemoryBooksRepo;

  constructor(booksRepo: InMemoryBooksRepo) {
    super();

    this.booksRepo = booksRepo;
  }

  async execute(bookDtp: NewBookDto) {
    const bookOrError = Book.create({
      title: bookDtp.title,
      author: bookDtp.author,
      isbn: bookDtp.isbn,
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
