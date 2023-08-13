import { Either, left, right } from "@sweet-monads/either";
import { CheckInBookUseCaseParams, ICheckInBookUseCase } from "../../domain";
import { Book } from "../../domain/entities/Book";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { IBorrowingsRepo } from "../../domain/repos/IBorrowingsRepo";
import { ILogger } from "../../shared/logger/types";

class CheckInBookUseCase implements ICheckInBookUseCase {
  constructor(
    private booksRepo: IBooksRepo,
    private borrowingsRepo: IBorrowingsRepo,
    private logger: ILogger,
  ) {}

  async execute({ bookId, memberId }: CheckInBookUseCaseParams): Promise<Either<Error, Book>> {
    const borrowingOrError = await this.borrowingsRepo.findByBookAndMember(bookId, memberId);

    if (borrowingOrError.isLeft()) {
      return left(new Error(`Book can't be checked in. ${borrowingOrError.value}`));
    }

    const borrowing = borrowingOrError.value;

    borrowing.complete(new Date());
    this.borrowingsRepo.save(borrowing);

    const bookOrError = await this.booksRepo.findById(borrowing.bookId);

    if (bookOrError.isLeft()) {
      return left(new Error(`Book can't be checked in. ${bookOrError.value}`));
    }

    const book = bookOrError.value;

    // book.checkIn(borrowing.id);
    this.booksRepo.save(book);

    return right(book);
  }
}

export { CheckInBookUseCase };
