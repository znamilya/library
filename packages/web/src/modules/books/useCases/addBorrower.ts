import { UseCase } from "@/modules/shared/application/types";
import { BookId, BorrowerId } from "../domain";

type UseAddBorrowerParams = {
  bookId: BookId;
  borrowerId: BorrowerId;
};

export const useAddBorrower: UseCase<[UseAddBorrowerParams], void> = () => {};
