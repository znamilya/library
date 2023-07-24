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
      return left(new Error("Error while creating book"));
    }

    const book = bookOrError.value;

    await this.booksRepo.save(book);

    return right(book);
  }
}

export { AddBookUseCase };
