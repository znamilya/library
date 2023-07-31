import { left } from "@sweet-monads/either";
import { Borrowing } from "../domain/entities/Borrowing/Borrowing";
import { BorrowingPersistence } from "../domain/repos/IBorrowingsRepo";
import { BooksMapper } from "./Books";

class BorrowingsMapper {
  static entityToPersistence(borrowing: Borrowing): BorrowingPersistence {
    return {
      id: borrowing.id,
      book: BooksMapper.entityToPersistence(borrowing.book),
      memberId: borrowing.memberId,
      checkOutDate: borrowing.checkOutDate,
      dueDate: borrowing.dueDate,
      checkInDate: borrowing.checkInDate,
    };
  }

  static persistenceToEntity(borrowing: BorrowingPersistence): Borrowing {
    const book = BooksMapper.persistenceToEntity(borrowing.book);

    const borrowingOrError = Borrowing.create(
      {
        book,
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
      book: BooksMapper.entityToDto(borrowing.book),
      memberId: borrowing.memberId,
      checkOutDate: borrowing.checkOutDate,
      dueDate: borrowing.dueDate,
      checkInDate: borrowing.checkInDate,
    };
  }
}

export { BorrowingsMapper };
