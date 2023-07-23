import { Borrowing } from "../../domain/entities/Borrowing";
import { BorrowingPersistence, IBorrowingsRepo } from "@/domain/repos/IBorrowingsRepo";
import { BorrowingsMapper } from "../../mappers/Borrowings";
import { left, right } from "@sweet-monads/either";

const borrowings: BorrowingPersistence[] = [
  // {
  //   id: "1",
  //   bookId: "10",
  //   memberId: "100",
  //   checkOutDate: new Date(),
  //   dueDate: new Date(),
  //   checkInDate: null,
  // },
];

class InMemoryBorrowingsRepo implements IBorrowingsRepo {
  async findAll() {
    return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
  }

  async findById(id: string) {
    const borrowing = borrowings.find((borrowing) => borrowing.id === id);

    if (!borrowing) {
      return left(new Error("borrowing not found"));
    }

    return right(BorrowingsMapper.persistenceToEntity(borrowing));
  }

  async save(borrowing: Borrowing) {
    const index = borrowings.findIndex((b) => b.id === borrowing.id);

    if (index === -1) {
      borrowings.push(BorrowingsMapper.entityToPersistence(borrowing));
    } else {
      borrowings[index] = BorrowingsMapper.entityToPersistence(borrowing);
    }

    return right(true);
  }
}

export { InMemoryBorrowingsRepo };
