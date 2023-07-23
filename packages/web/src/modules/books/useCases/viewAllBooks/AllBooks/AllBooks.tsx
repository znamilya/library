import { isNonEmptyArray } from "@/modules/shared/utils";
import { BooksList, BooksNotFound } from "../../../ui/components";
import { SetBorrowerFragment } from "../../setBorrower/SetBorrower";
import { useViewAllBooks } from "../useViewAllBooks";

export const AllBooksFragment = () => {
  const allBooks = useViewAllBooks();

  if (!allBooks) {
    return null;
  }

  if (!isNonEmptyArray(allBooks)) {
    return <BooksNotFound />;
  }

  return (
    <BooksList
      books={allBooks}
      renderBorrowButton={(bookId) => <SetBorrowerFragment bookId={bookId} />}
    />
  );
};
