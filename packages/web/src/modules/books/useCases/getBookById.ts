import { UseCase } from "@/modules/shared/application/types";

import { Book, BookId } from "../domain";
import { useFindBookById } from "../infrastructure/repos/reactQueryBooksRepo";

export const useGetBookByIdCase: UseCase<[BookId], Book | null | undefined> = (bookId) => {
  const book = useFindBookById(bookId);

  // TODO: send error to bug tracker

  return book;
};
