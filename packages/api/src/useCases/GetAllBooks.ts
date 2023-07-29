import { GetAllBooksUseParamsParams, IGetAllBooksUseCase } from "../domain";
import { IBooksRepo } from "../domain/repos/IBooksRepo";

class GetAllBooksUseCase implements IGetAllBooksUseCase {
  constructor(private booksRepo: IBooksRepo) {}

  async execute({ title }: GetAllBooksUseParamsParams = {}) {
    if (title) {
      return this.booksRepo.findByTitle(title);
    }

    return this.booksRepo.findAll();
  }
}

export { GetAllBooksUseCase };
