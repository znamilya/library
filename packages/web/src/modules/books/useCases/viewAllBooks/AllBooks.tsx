import { useRQFindAllBooks } from "@/modules/books/repos/reactQueryBooksRepo";
import { isNonEmptyArray } from "@/modules/shared/utils";

import { IFindBooksRepo } from "@/modules/books/repos/BooksRepo";
import { BooksList } from "./components/BooksList";
import { BooksNotFound } from "./components/BooksNotFound";

type AllBooksUseCaseProps = {
  useFindAllBooks: IFindBooksRepo;
};

export const AllBooksUseCase = ({ useFindAllBooks }: AllBooksUseCaseProps) => {
  const allBooks = useFindAllBooks();

  if (!allBooks) {
    return null;
  }

  if (!isNonEmptyArray(allBooks)) {
    return <BooksNotFound />;
  }

  return (
    <BooksList
      books={allBooks}
      onBookCheckIn={console.log}
      // renderBorrowButton={(bookId) => <CheckoutBookFragment />}
    />
  );
};
