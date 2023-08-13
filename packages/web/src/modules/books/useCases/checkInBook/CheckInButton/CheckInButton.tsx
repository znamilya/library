import { Button } from "@mui/material";

import { IFindBookByIdRepo } from "@/modules/books/repos/BooksRepo";

import { BookId } from "../../../domain/book";
import { useCheckInBook } from "@/modules/books/repos/reactQuery";
import { LoadingButton } from "@mui/lab";

type CheckInButtonProps = {
  bookId: BookId;
  useFindBookById: IFindBookByIdRepo;
};

export const CheckInButton = ({ bookId, useFindBookById }: CheckInButtonProps) => {
  const book = useFindBookById(bookId);
  const checkInBook = useCheckInBook();

  if (!book) {
    return null;
  }

  const handleButtonClick = () => {
    checkInBook.execute(bookId);
  };

  return (
    <LoadingButton
      variant="contained"
      size="small"
      onClick={handleButtonClick}
      loading={checkInBook.isExecuting}
    >
      Check-in
    </LoadingButton>
  );
};
