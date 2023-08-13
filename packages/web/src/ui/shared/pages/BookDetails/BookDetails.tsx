import { useParams } from "react-router";

import { BookId } from "@/modules/books";
import { useRQFindBookById } from "@/modules/books/repos/reactQuery";
import { ViewBookDetailsUseCase } from "@/modules/books/useCases";

export const BookDetailsPage = () => {
  const { bookId } = useParams();

  return (
    <div>
      <ViewBookDetailsUseCase bookId={bookId as BookId} useFindBookById={useRQFindBookById} />

      {/* <RemoveBookFragment />
      <AddBorrowerFragment />
      <RemoveBorrowerFragment />

      <BookBorrowingHistoryFragment /> */}
    </div>
  );
};
