import { left, right } from "@sweet-monads/either";

import { IRemoveBookUseCase, RemoveBookUseCaseParams } from "../../domain";
import { Book } from "../../domain/entities/Book";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { BaseUseCase } from "../../shared/BaseUseCase";
import { ILogger } from "../../shared/logger/types";

class RemoveBookUseCase
  extends BaseUseCase<RemoveBookUseCaseParams, Book>
  implements IRemoveBookUseCase
{
  constructor(private booksRepo: IBooksRepo, private logger: ILogger) {
    super();
  }

  async executeImpl({ bookId }: RemoveBookUseCaseParams) {
    const bookOrError = await this.booksRepo.removeById(bookId);

    if (bookOrError.isLeft()) {
      this.logger.debug(
        `[RemoveBookUseCase]: Book not removed: ${JSON.stringify(bookOrError.value.message)}`,
      );

      return left(bookOrError.value);
    }

    return bookOrError;
  }
}

export { RemoveBookUseCase };
