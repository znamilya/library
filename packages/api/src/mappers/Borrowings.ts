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

  static persistenceToEntity(borrowingPersistence: BorrowingPersistence): Borrowing {
    return Borrowing.create(
      {
        bookId: borrowingPersistence.bookId,
        memberId: borrowingPersistence.memberId,
        checkOutDate: borrowingPersistence.checkOutDate,
        dueDate: borrowingPersistence.dueDate,
        checkInDate: borrowingPersistence.checkInDate,
      },
      borrowingPersistence.id,
    );
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
