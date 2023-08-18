import { left, right } from "@sweet-monads/either";
import { Borrowing } from "../../domain/entities/Borrowing";
import { IBorrowingsRepo } from "../../domain/repos/IBorrowingsRepo";
import { BorrowingsMapper } from "../../mappers/Borrowings";
import { DbContext } from "./InMemory/types";
import { EntityNotFoundException } from "../../shared/exceptions/repoExceptions/EntityNotFoundException";

class InMemoryBorrowingsRepo implements IBorrowingsRepo {
  constructor(private dbContext: DbContext) {}

  async findAll() {
    const { borrowings } = this.dbContext;

    return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
  }

  async findByBookId(bookId: string) {
    const { borrowings } = this.dbContext;
    const finalBorrowings = borrowings.filter((borrowing) => borrowing.bookId === bookId);

    return right(finalBorrowings.map(BorrowingsMapper.persistenceToEntity));
  }

  async findById(id: string) {
    const borrowing = this.dbContext.borrowings.find((borrowing) => borrowing.id === id);

    if (!borrowing) {
      return left(new EntityNotFoundException("Borrowing"));
    }

    return right(BorrowingsMapper.persistenceToEntity(borrowing));
  }

  async findByBookAndMember(bookId: string, memberId: string) {
    const borrowing = this.dbContext.borrowings.find(
      (borrowing) => borrowing.bookId === bookId && borrowing.memberId === memberId,
    );

    if (!borrowing) {
      return left(new EntityNotFoundException("Borrowing"));
    }

    return right(BorrowingsMapper.persistenceToEntity(borrowing));
  }

  async save(borrowing: Borrowing) {
    const index = this.dbContext.borrowings.findIndex((b) => b.id === borrowing.id);

    if (index === -1) {
      this.dbContext.borrowings.push(BorrowingsMapper.entityToPersistence(borrowing));
    } else {
      this.dbContext.borrowings[index] = BorrowingsMapper.entityToPersistence(borrowing);
    }

    return right(true);
  }
}

export { InMemoryBorrowingsRepo };
