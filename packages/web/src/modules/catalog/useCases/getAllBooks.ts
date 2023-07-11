import { UseCase } from "@/modules/shared/application/types";

import { Book } from "../domain";
import { useFindAllBooks } from "../infrastructure/repos/reactQueryBooksRepo";

export const useGetAllBooksCase: UseCase<[void], Book[] | undefined> = () => {
  const allBooks = useFindAllBooks();

  // TODO: send error to bug tracker

  return allBooks;
};
