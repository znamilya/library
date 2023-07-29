import { left, right } from "@sweet-monads/either";
import { IRemoveBookUseCase, RemoveBookUseCaseParams } from "../domain";
import { InMemoryBooksRepo } from "../infra/repos/InMemoryBooksRepo";

class RemoveBookUseCase implements IRemoveBookUseCase {
  private booksRepo: InMemoryBooksRepo;

  constructor(booksRepo: InMemoryBooksRepo) {
    this.booksRepo = booksRepo;
  }

  async execute({ bookId }: RemoveBookUseCaseParams) {
    const bookOrError = await this.booksRepo.removeById(bookId);

    if (bookOrError.isLeft()) {
      return left(bookOrError.value);
    }

    return right(bookOrError.value);
  }
}

export { RemoveBookUseCase };
