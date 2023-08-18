import { left } from "@sweet-monads/either";
import { GetAllBooksUseParamsParams, IGetAllBooksUseCase } from "../../domain";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { ILogger } from "../../shared/logger/types";

class GetAllBooksUseCase implements IGetAllBooksUseCase {
  constructor(private booksRepo: IBooksRepo, private logger: ILogger) {}

  async execute({ title }: GetAllBooksUseParamsParams = {}) {
    const booksOrError = title
      ? await this.booksRepo.findByTitle(title)
      : await this.booksRepo.findAll();

    if (booksOrError.isLeft()) {
      this.logger.debug(`[GetAllBooksUseCase] Books not found: ${booksOrError.value.message}`);

      return left(booksOrError);
    }

    this.logger.debug(`[GetAllBooksUseCase] Books found: ${booksOrError.value.length}`);

    return booksOrError;
  }
}

export { GetAllBooksUseCase };
