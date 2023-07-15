import { makeBook } from "../../../../src/modules/books/domain/book/book.mock";
import { Book } from "../../../../src/modules/books/domain/book/book";
import { CatalogPage } from "../../../support/pageObjects/CatalogPage";

it("main success scenario", () => {
  const catalogPage = new CatalogPage();
  const BOOKS = [makeBook(), makeBook(), makeBook()];

  cy.intercept("GET", "/api/v1/books", BOOKS);
  catalogPage.visit();

  const { allBooksFragment } = catalogPage;

  allBooksFragment.getBooks().should("have.length", 3);
  allBooksFragment.getBooksNotFound().should("not.exist");

  BOOKS.forEach((book, index) => {
    allBooksFragment.getBookTitleText(index).should("eq", book.title);
  });
});

it("when there is no books", () => {
  const catalogPage = new CatalogPage();
  const BOOKS: Book[] = [];

  cy.intercept("GET", "/api/v1/books", BOOKS);
  catalogPage.visit();

  const { allBooksFragment } = catalogPage;

  allBooksFragment.getBooksList().should("not.exist");
  allBooksFragment.getBooksNotFound().should("be.visible");
});
