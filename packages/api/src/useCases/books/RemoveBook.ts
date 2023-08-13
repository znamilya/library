import { left, right } from "@sweet-monads/either";

import { IRemoveBookUseCase, RemoveBookUseCaseParams } from "../../domain";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { ILogger } from "../../shared/logger/types";

class RemoveBookUseCase implements IRemoveBookUseCase {
  constructor(private booksRepo: IBooksRepo, private logger: ILogger) {}

  async execute({ bookId }: RemoveBookUseCaseParams) {
    const bookOrError = await this.booksRepo.removeById(bookId);

    if (bookOrError.isLeft()) {
      return left(bookOrError.value);
    }

    return right(bookOrError.value);
  }
}

export { RemoveBookUseCase };
