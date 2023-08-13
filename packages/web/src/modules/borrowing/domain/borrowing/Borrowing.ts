import { Book } from "@/modules/books";
import { EntityId } from "@/modules/shared";

export type BorrowingId = EntityId;

export type Borrowing = {
  id: BorrowingId;
  book: Book;
  memberId: string;
  checkOutDate: Date;
  dueDate: Date;
  checkInDate: Date | null;
};
