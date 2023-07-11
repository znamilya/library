import { useParams } from "react-router";

import {
  AddBorrowerFragment,
  BookBorrowingHistoryFragment,
  BookDetailsFragment,
  BookId,
  RemoveBookFragment,
  RemoveBorrowerFragment,
} from "@/modules/catalog";

export const BookDetailsPage = () => {
  const { bookId } = useParams();

  return (
    <div>
      <BookDetailsFragment bookId={bookId as BookId} />

      <RemoveBookFragment />
      <AddBorrowerFragment />
      <RemoveBorrowerFragment />

      <BookBorrowingHistoryFragment />
    </div>
  );
};
