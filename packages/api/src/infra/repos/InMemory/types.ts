import { BookPersistence } from "../../../domain/repos/IBooksRepo";
import { BorrowingPersistence } from "../../../domain/repos/IBorrowingsRepo";
import { MemberPersistence } from "../../../domain/repos/IMembersRepo";

export type DbContext = {
  books: BookPersistence[];
  borrowings: BorrowingPersistence[];
  members: MemberPersistence[];
};
