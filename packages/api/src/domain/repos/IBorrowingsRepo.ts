import { Either } from "@sweet-monads/either";
import { Borrowing } from "../entities/Borrowing/Borrowing";

export type BorrowingPersistence = {
  id: string;
  bookId: string;
  memberId: string;
  checkOutDate: Date;
  dueDate: Date;
  checkInDate: Date | null;
};

export type IBorrowingsRepo = {
  findAll(): Promise<Either<Error, Borrowing[]>>;
  findById(id: string): Promise<Either<Error, Borrowing>>;
  findByBookAndMember(bookId: string, memberId: string): Promise<Either<Error, Borrowing>>;
  save(borrowing: Borrowing): Promise<Either<Error, boolean>>;
};
