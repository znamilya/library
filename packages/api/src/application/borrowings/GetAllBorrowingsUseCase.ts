import { left, right } from "@sweet-monads/either";
import { GetAllBorrowingsUseCaseParams, IGetAllBorrowingsUseCase } from "../../domain";
import { IBorrowingsRepo } from "../../domain/repos/IBorrowingsRepo";
import { BorrowingsMapper } from "../../mappers/Borrowings";

class GetAllBorrowingsUseCase implements IGetAllBorrowingsUseCase {
  constructor(private borrowingsRepo: IBorrowingsRepo) {}

  async execute({ bookId }: GetAllBorrowingsUseCaseParams = {}) {
    if (bookId) {
      const borrowingsOrError = await this.borrowingsRepo.findAllByBookId(bookId);

      if (borrowingsOrError.isLeft()) {
        return left(new Error(`Borrowings can't be retrieved. ${borrowingsOrError.value}`));
      }

      return right(borrowingsOrError.value.map(BorrowingsMapper.entityToDto));
    }

    const borrowingsOrError = await this.borrowingsRepo.findAllActive();

    if (borrowingsOrError.isLeft()) {
      return left(new Error(`Borrowings can't be retrieved. ${borrowingsOrError.value}`));
    }

    return right(borrowingsOrError.value.map(BorrowingsMapper.entityToDto));
  }
}

export { GetAllBorrowingsUseCase };
