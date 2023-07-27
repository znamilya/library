import { BaseUseCase } from "../shared/application/BaseUseCase";
import { IBooksRepo } from "../domain/repos/IBooksRepo";

type GetAllBooksParams = {
  title?: string;
};
class GetAllBooksUseCase extends BaseUseCase {
  private booksRepo: IBooksRepo;

  constructor(booksRepo: IBooksRepo) {
    super();

    this.booksRepo = booksRepo;
  }

  async execute({ title }: GetAllBooksParams = {}) {
    if (title) {
      return this.booksRepo.findByTitle(title);
    }

    return this.booksRepo.findAll();
  }
}

export { GetAllBooksUseCase };
