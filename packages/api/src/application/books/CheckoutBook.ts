import { Either, left, right } from "@sweet-monads/either";
import { CheckOutBookUseCaseParams, ICheckOutBookUseCase } from "../../domain";
import { Book } from "../../domain/entities/Book";
import { Borrowing } from "../../domain/entities/Borrowing";
import { IBooksRepo } from "../../domain/repos/IBooksRepo";
import { IBorrowingsRepo } from "../../domain/repos/IBorrowingsRepo";
import { IMembersRepo } from "../../domain/repos/IMembersRepo";
import { MemberCanBorrowMoreBooksRule } from "../../domain/rules";
import { BaseUseCase } from "../../shared/BaseUseCase";
import { ILogger } from "../../shared/logger/types";
import { BadParamsException, MaxBorrowingLimitReachedException } from "../errors";

class CheckoutBookUseCase
  extends BaseUseCase<CheckOutBookUseCaseParams, Book>
  implements ICheckOutBookUseCase
{
  constructor(
    private booksRepo: IBooksRepo,
    private membersRepo: IMembersRepo,
    private borrowingsRepo: IBorrowingsRepo,
    private logger: ILogger,
  ) {
    super();
  }

  async executeImpl({ bookId, memberId }: CheckOutBookUseCaseParams): Promise<Either<Error, Book>> {
    const bookOrError = await this.booksRepo.findById(bookId);

    if (bookOrError.isLeft()) {
      this.logger.debug(`[CheckoutBookUseCase] Book not found: ${bookId}`);

      return left(new BadParamsException(bookOrError.value, "bookId"));
    }

    const book = bookOrError.value;
    const memberOrError = await this.membersRepo.findById(memberId);

    if (memberOrError.isLeft()) {
      this.logger.debug(`[CheckoutBookUseCase] Member not found: ${memberId}`);

      return left(new BadParamsException(memberOrError.value, "memberId"));
    }

    const member = memberOrError.value;
    const memberCanBorrowMoreBooksRule = new MemberCanBorrowMoreBooksRule();

    if (!memberCanBorrowMoreBooksRule.isSatisfiedBy(member)) {
      this.logger.debug(`[CheckoutBookUseCase] Member can't borrow more books: ${memberId}`);

      return left(new MaxBorrowingLimitReachedException());
    }

    const borrowing = Borrowing.create({
      bookId: book.id,
      memberId: member.id,
      checkOutDate: new Date(),
      dueDate: new Date(),
      checkInDate: null,
    });

    const saveBorrowingResult = await this.borrowingsRepo.save(borrowing);

    if (saveBorrowingResult.isLeft()) {
      this.logger.debug(
        `[CheckoutBookUseCase] Borrowing not saved: ${saveBorrowingResult.value.message}`,
      );

      return left(saveBorrowingResult.value);
    }

    this.logger.debug(`Book checked out: ${bookId} ${memberId}`);

    return right(book);
  }
}

export { CheckoutBookUseCase };
