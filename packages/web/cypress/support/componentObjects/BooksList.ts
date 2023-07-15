import { BooksListTestIds } from "../../../src/modules/books/ui/components/BooksList/BooksList.testIds";
import { BaseComponent } from "./BaseComponent";

class BooksList extends BaseComponent {
  constructor(selector = `[data-testid=${BooksListTestIds.root}]`) {
    super(selector);
  }

  // QUERIES
  getBookTitleText(index: number): Cypress.Chainable<JQuery<String>> {
    return this.getBooks().eq(index).find("h4").invoke("text");
  }

  getBookTitleHref(index: number) {
    return this.getBooks().eq(index).find("h4").find("a").invoke("attr", "href");
  }

  getBookDescriptionText(index: number) {
    return this.getBooks()
      .eq(index)
      .find(`[data-testid=${BooksListTestIds.itemMetaInfo}]`)
      .invoke("text");
  }

  getBooks() {
    return this.get().find(`[data-testid=${BooksListTestIds.item}]`);
  }
}

export { BooksList };
