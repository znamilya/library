import { isNonEmptyArray } from "@/modules/shared/utils";
import { useGetAllBooksCase } from "../../../useCases";
import { BooksList, BooksNotFound } from "../../components";

export const AllBooksFragment = () => {
  const allBooks = useGetAllBooksCase();

  if (!allBooks) {
    return null;
  }

  if (!isNonEmptyArray(allBooks)) {
    return <BooksNotFound />;
  }

  return <BooksList books={allBooks} />;
};
