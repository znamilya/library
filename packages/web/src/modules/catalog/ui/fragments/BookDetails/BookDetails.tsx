import { useGetBookByIdCase } from "@/modules/catalog/useCases";

import { BookId } from "../../../domain/book";

type BookDetailsFragmentProps = {
  bookId: BookId;
};

export const BookDetailsFragment = ({ bookId }: BookDetailsFragmentProps) => {
  const book = useGetBookByIdCase(bookId);

  if (!book) {
    return <h1>Book not found</h1>;
  }

  return <h1>{book.title}</h1>;
};
