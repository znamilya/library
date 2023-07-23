import { BaseUseCase } from "../shared/application/BaseUseCase";
import { IBooksRepo } from "../domain/repos/IBooksRepo";

class GetAllBooksUseCase extends BaseUseCase {
  private booksRepo: IBooksRepo;

  constructor(booksRepo: IBooksRepo) {
    super();

    this.booksRepo = booksRepo;
  }

  async execute() {
    return this.booksRepo.findAll();
  }
}

export { GetAllBooksUseCase };
