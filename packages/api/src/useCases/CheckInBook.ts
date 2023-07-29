import { Either, left, right } from "@sweet-monads/either";
import { CheckInBookUseCaseParams, ICheckInBookUseCase } from "../domain";
import { Book } from "../domain/entities/Book";
import { IBooksRepo } from "../domain/repos/IBooksRepo";
import { IBorrowingsRepo } from "../domain/repos/IBorrowingsRepo";

class CheckInBookUseCase implements ICheckInBookUseCase {
  private booksRepo: IBooksRepo;
  private borrowingsRepo: IBorrowingsRepo;

  constructor(booksRepo: IBooksRepo, borrowingsRepo: IBorrowingsRepo) {
    this.booksRepo = booksRepo;
    this.borrowingsRepo = borrowingsRepo;
  }

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

    book.checkIn(borrowing.id);
    this.booksRepo.save(book);

    return right(book);
  }
}

export { CheckInBookUseCase };
