import { left, right } from "@sweet-monads/either";
import { IAddBookUseCase } from "../../domain";
import { Book } from "../../domain/entities/Book";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { NewBookDto } from "../../dtos/Book";
import { BaseUseCase } from "../../shared/BaseUseCase";
import { ILogger } from "../../shared/logger/types";

class AddBookUseCase extends BaseUseCase<NewBookDto, Book> implements IAddBookUseCase {
  constructor(private booksRepo: IBooksRepo, private logger: ILogger) {
    super();
  }

  async executeImpl(bookDto: NewBookDto) {
    const bookOrError = Book.create({
      title: bookDto.title,
      author: bookDto.author,
      isbn: bookDto.isbn,
    });

    if (bookOrError.isLeft()) {
      this.logger.debug(`[AddBookUseCase] Book not created: ${bookOrError.value.message}`);

      return left(bookOrError.value);
    }

    const saveBookResult = await this.booksRepo.save(bookOrError.value);

    if (saveBookResult.isLeft()) {
      this.logger.debug(`[AddBookUseCase] Book not saved: ${saveBookResult.value.message}`);

      return left(saveBookResult.value);
    }

    this.logger.debug(`[AddBookUseCase] Book saved: ${JSON.stringify(saveBookResult.value)}`);

    return saveBookResult;
  }
}

export { AddBookUseCase };
