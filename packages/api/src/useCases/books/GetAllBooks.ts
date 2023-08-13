import { GetAllBooksUseParamsParams, IGetAllBooksUseCase } from "../../domain";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { ILogger } from "../../shared/logger/types";

class GetAllBooksUseCase implements IGetAllBooksUseCase {
  constructor(private booksRepo: IBooksRepo, private logger: ILogger) {}

  async execute({ title }: GetAllBooksUseParamsParams = {}) {
    if (title) {
      return this.booksRepo.findByTitle(title);
    }

    return this.booksRepo.findAll();
  }
}

export { GetAllBooksUseCase };
