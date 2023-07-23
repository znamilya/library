import { Either, left, right } from "@sweet-monads/either";
import { Borrowing } from "../domain/entities/Borrowing";
import { IBooksRepo } from "../domain/repos/IBooksRepo";
import { IBorrowingsRepo } from "../domain/repos/IBorrowingsRepo";
import { IMembersRepo } from "../domain/repos/IMembersRepo";
import { BaseUseCase } from "../shared/application/BaseUseCase";
import { Book } from "../domain/entities/Book";

class CheckoutBookUseCase extends BaseUseCase {
  private booksRepo: IBooksRepo;
  private membersRepo: IMembersRepo;
  private borrowingsRepo: IBorrowingsRepo;

  constructor(booksRepo: IBooksRepo, membersRepo: IMembersRepo, borrowingsRepo: IBorrowingsRepo) {
    super();

    this.booksRepo = booksRepo;
    this.membersRepo = membersRepo;
    this.borrowingsRepo = borrowingsRepo;
  }

  async execute(bookId: string, memberId: string): Promise<Either<Error, Book>> {
    const bookOrError = await this.booksRepo.findById(bookId);

    if (bookOrError.isLeft()) {
      return left(new Error(`Book can't be checked out. ${bookOrError.value}`));
    }

    const book = bookOrError.value;

    if (!book.isAvailable()) {
      return left(new Error("Book can't be checked out. It's not available."));
    }

    const memberOrError = await this.membersRepo.findById(memberId);

    if (memberOrError.isLeft()) {
      return left(new Error(`Book can't be checked out. ${memberOrError.value}`));
    }

    const member = memberOrError.value;

    if (!member.canBorrowMoreBooks()) {
      return left(
        new Error("Book can't be checked out. Member has reached the limit of borrowed books."),
      );
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
      return left(new Error(`Book can't be checked out. ${saveBorrowingResult.value}`));
    }

    book.checkOut(borrowing.id);

    const saveBookResult = await this.booksRepo.save(book);

    if (saveBookResult.isLeft()) {
      return left(new Error(`Book can't be checked out. ${saveBookResult.value}`));
    }

    return right(book);
  }
}

export { CheckoutBookUseCase };
