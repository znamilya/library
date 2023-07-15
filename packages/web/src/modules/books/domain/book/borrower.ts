import { EntityId } from "@/modules/shared";

export type BorrowerId = EntityId;

export type Borrower = {
  id: BorrowerId;
  fullName: string;
};
