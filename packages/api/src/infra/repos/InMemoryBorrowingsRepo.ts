import { left, right } from "@sweet-monads/either";
import { Borrowing } from "../../domain/entities/Borrowing";
import { BorrowingPersistence, IBorrowingsRepo } from "../../domain/repos/IBorrowingsRepo";
import { BorrowingsMapper } from "../../mappers/Borrowings";

class InMemoryBorrowingsRepo implements IBorrowingsRepo {
  borrowings: BorrowingPersistence[];

  constructor(initialBooks: BorrowingPersistence[] = []) {
    this.borrowings = initialBooks;
  }

  async findAll() {
    return right(this.borrowings.map(BorrowingsMapper.persistenceToEntity));
  }

  async findByBookId(bookId: string) {
    const borrowings = this.borrowings.filter((borrowing) => borrowing.bookId === bookId);

    return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
  }

  async findById(id: string) {
    const borrowing = this.borrowings.find((borrowing) => borrowing.id === id);

    if (!borrowing) {
      return left(new Error("borrowing not found"));
    }

    return right(BorrowingsMapper.persistenceToEntity(borrowing));
  }

  async findByBookAndMember(bookId: string, memberId: string) {
    const borrowing = this.borrowings.find(
      (borrowing) => borrowing.bookId === bookId && borrowing.memberId === memberId,
    );

    if (!borrowing) {
      return left(new Error("borrowing not found"));
    }

    return right(BorrowingsMapper.persistenceToEntity(borrowing));
  }

  async save(borrowing: Borrowing) {
    const index = this.borrowings.findIndex((b) => b.id === borrowing.id);

    if (index === -1) {
      this.borrowings.push(BorrowingsMapper.entityToPersistence(borrowing));
    } else {
      this.borrowings[index] = BorrowingsMapper.entityToPersistence(borrowing);
    }

    return right(true);
  }
}

export { InMemoryBorrowingsRepo };
