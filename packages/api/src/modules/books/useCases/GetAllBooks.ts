import { BaseUseCase } from "../../shared/application/BaseUseCase";
import { BooksRepo } from "../infrastructure/repos/BooksRepo";

class GetAllBooksUseCase extends BaseUseCase {
  private booksRepo: BooksRepo;

  constructor(booksRepo: BooksRepo) {
    super();

    this.booksRepo = booksRepo;
  }

  async execute() {
    return this.booksRepo.findAll();
  }
}

export { GetAllBooksUseCase };
