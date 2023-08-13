import { Borrowing } from "../domain/entities/Borrowing/Borrowing";
import { BorrowingPersistence } from "../domain/repos/IBorrowingsRepo";

class BorrowingsMapper {
  static entityToPersistence(borrowing: Borrowing): BorrowingPersistence {
    return {
      id: borrowing.id,
      bookId: borrowing.bookId,
      memberId: borrowing.memberId,
      checkOutDate: borrowing.checkOutDate,
      dueDate: borrowing.dueDate,
      checkInDate: borrowing.checkInDate,
    };
  }

  static persistenceToEntity(borrowing: BorrowingPersistence): Borrowing {
    const borrowingOrError = Borrowing.create(
      {
        bookId: borrowing.bookId,
        memberId: borrowing.memberId,
        checkOutDate: borrowing.checkOutDate,
        dueDate: borrowing.dueDate,
        checkInDate: borrowing.checkInDate,
      },
      borrowing.id,
    );

    return borrowingOrError as Borrowing;
  }

  static entityToDto(borrowing: Borrowing): any {
    return {
      id: borrowing.id,
      bookId: borrowing.bookId,
      memberId: borrowing.memberId,
      checkOutDate: borrowing.checkOutDate,
      dueDate: borrowing.dueDate,
      checkInDate: borrowing.checkInDate,
    };
  }
}

export { BorrowingsMapper };
