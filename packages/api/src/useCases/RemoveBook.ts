import { left, right } from "@sweet-monads/either";
import { Book } from "../domain/entities/Book";
import { NewBookDto } from "../dtos/Book";
import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";
import { BaseUseCase } from "../shared/application/BaseUseCase";

class RemoveBookUseCase extends BaseUseCase {
  private booksRepo: InMemoryBooksRepo;

  constructor(booksRepo: InMemoryBooksRepo) {
    super();

    this.booksRepo = booksRepo;
  }

  async execute(bookId: string) {
    const bookOrError = await this.booksRepo.removeById(bookId);

    if (bookOrError.isLeft()) {
      return left(bookOrError.value);
    }

    return right(bookOrError.value);
  }
}

export { RemoveBookUseCase };
