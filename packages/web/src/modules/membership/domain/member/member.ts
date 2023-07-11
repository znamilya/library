import { EntityId } from "@/modules/shared";

import { ReadBook } from "./readBook";

export type MemberId = EntityId;

export type Member = {
  id: MemberId;
  fullName: string;
  borrowedBooks: ReadBook[];
  reservedBooks: ReadBook[];
  readBooks: ReadBook[];
};

export const canReserveMoreBooks = (member: Member): boolean => {
  return member.borrowedBooks.length + member.reservedBooks.length <= 3;
};
