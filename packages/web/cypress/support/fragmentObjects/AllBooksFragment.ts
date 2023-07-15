import { BooksList, BooksNotFound } from "../componentObjects";
import { BaseFragment } from "./BaseFragment";

class AllBooksFragment extends BaseFragment {
  booksList = new BooksList();
  booksNotFound = new BooksNotFound();

  constructor() {
    super("div[data-testid='all-books']");
  }

  getBooksList() {
    return this.booksList.get();
  }

  getBooksNotFound() {
    return this.booksNotFound.get();
  }

  getBooks() {
    return this.booksList.getBooks();
  }

  getBookTitleText(index: number) {
    return this.booksList.getBookTitleText(index);
  }
}

export { AllBooksFragment };
