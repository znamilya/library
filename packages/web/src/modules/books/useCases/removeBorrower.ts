import { UseCase } from "@/modules/shared/application/types";
import { BookId, BorrowerId } from "../domain";

type UseRemoveBorrowerParams = {
  bookId: BookId;
  borrowerId: BorrowerId;
};

export const useRemoveBorrower: UseCase<[UseRemoveBorrowerParams], void> = () => {};
