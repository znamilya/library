import { UseCase } from "@/modules/shared/application/types";
import { BookId } from "../domain";

type UseRemoveBookParams = {
  bookId: BookId;
};

export const useRemoveBook: UseCase<[UseRemoveBookParams], void> = () => {};
