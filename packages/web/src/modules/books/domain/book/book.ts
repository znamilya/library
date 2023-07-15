import { EntityId } from "@/modules/shared";

import { Borrower, BorrowerId } from "./borrower";
import { ISBN } from "./isbn";
import { Member, canReserveMoreBooks } from "@/modules/members";

export type BookId = EntityId;

export type Book = {
  id: BookId;
  title: string;
  description: string;
  author: string;
  isbn: ISBN;
};

// CHECKS
// export const isBookBorrowed = (book: Book): book is Book & { BorrowedBy: Borrower } =>
//   !!book.borrowedBy;

// export const isBookReserved = (book: Book): book is Book & { ReservedBy: Borrower } =>
//   !!book.reservedBy;

// export const isBookAvailableForBorrowing = (book: Book): boolean =>
//   !isBookBorrowed(book) && !isBookReserved(book);

// export const isBookAvailableForReservation = (book: Book): boolean =>
//   !isBookBorrowed(book) && !isBookReserved(book);

// /**
//  * Check if the given member can reserve the given book.
//  */
// export const canMemberReserveBook = (member: Member, book: Book): boolean => {
//   if (isBookBorrowed(book)) return false;
//   if (isBookReserved(book)) return false;

//   return canReserveMoreBooks(member);
// };
