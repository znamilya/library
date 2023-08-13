import { IFindBookByIdRepo } from "../../repos/BooksRepo";
import { BookId, isBookBorrowed } from "../../domain/book";
import { CheckInButton } from "../checkInBook";

type BookDetailsFragmentProps = {
  bookId: BookId;
  useFindBookById: IFindBookByIdRepo;
};

export const ViewBookDetailsUseCase = ({ bookId, useFindBookById }: BookDetailsFragmentProps) => {
  const book = useFindBookById(bookId);

  if (!book) {
    return <h1>Book not found</h1>;
  }

  return (
    <>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>

      {isBookBorrowed(book) ? (
        <CheckInButton bookId={book.id} useFindBookById={useFindBookById} />
      ) : null}
    </>
  );
};
