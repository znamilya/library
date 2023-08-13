import { left, right } from "@sweet-monads/either";
import { IAddBookUseCase } from "../../domain";
import { Book } from "../../domain/entities/Book";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { NewBookDto } from "../../dtos/Book";
import { ILogger } from "../../shared/logger/types";

class AddBookUseCase implements IAddBookUseCase {
  constructor(private booksRepo: IBooksRepo, private logger: ILogger) {}

  async execute(bookDto: NewBookDto) {
    this.logger.debug(`Executing AddBookUseCase with book data: ${JSON.stringify(bookDto)}`);

    const bookOrError = Book.create({
      title: bookDto.title,
      author: bookDto.author,
      isbn: bookDto.isbn,
    });

    if (bookOrError.isLeft()) {
      this.logger.debug(`Error while creating book. ${bookOrError.value}`);
      return left(new Error(`Error while creating book. ${bookOrError.value}`));
    }

    const book = bookOrError.value;

    const saveBookResult = await this.booksRepo.save(book);

    if (saveBookResult.isLeft()) {
      this.logger.debug(`Can't save book. ${saveBookResult.value}`);
      return left(new Error(`Can't save book. ${saveBookResult.value}`));
    }

    this.logger.debug(`Book saved. Book: ${JSON.stringify(book)}`);

    return right(book);
  }
}

export { AddBookUseCase };
