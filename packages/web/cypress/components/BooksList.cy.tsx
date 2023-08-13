import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

import { Book, makeBook } from "@/modules/books";
import { NonEmptyArray } from "@/modules/shared";
import { BooksList as BooksListComponent } from "@/modules/books/useCases/viewAllBooks/components/BooksList";
import { BooksList } from "../support/componentObjects";

it("main success scenario", () => {
  const BOOKS: NonEmptyArray<Book> = [makeBook(), makeBook(), makeBook()];

  cy.mount(
    <BrowserRouter>
      <ThemeProvider theme={createTheme()}>
        <BooksListComponent books={BOOKS} />
      </ThemeProvider>
    </BrowserRouter>,
  );

  const booksList = new BooksList();

  cy.step("Check order");
  booksList.getBooks().should("have.length", BOOKS.length);

  cy.step("Check items content");
  BOOKS.forEach((book, index) => {
    booksList.getBookTitleText(index).should("eq", book.title);
    booksList.getBookTitleHref(index).should("eq", `/catalog/${book.id}`);
    booksList
      .getBookDescriptionText(index)
      .should("eq", `Author: ${book.author}, ISBN: ${book.isbn}`);
  });
});
