import { Either } from "@sweet-monads/either";
import { Borrowing } from "../entities/Borrowing/Borrowing";
import { BookPersistence } from "./IBooksRepo";

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
  findAllActive(): Promise<Either<Error, Borrowing[]>>;
  findAllCompleted(): Promise<Either<Error, Borrowing[]>>;
  findAllActiveOverdue(): Promise<Either<Error, Borrowing[]>>;
  findAllByBookId(bookId: string): Promise<Either<Error, Borrowing[]>>;
  findAllByMemberId(memberId: string): Promise<Either<Error, Borrowing[]>>;
  findOneById(id: string): Promise<Either<Error, Borrowing>>;
  findOneByBookIdAndMemberId(bookId: string, memberId: string): Promise<Either<Error, Borrowing>>;
  save(borrowing: Borrowing): Promise<Either<Error, boolean>>;
  update(borrowing: Borrowing): Promise<Either<Error, Borrowing>>;
};
