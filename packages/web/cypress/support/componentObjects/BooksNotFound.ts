import { BooksNotFoundTestIds } from "../../../src/modules/books/useCases/viewAllBooks/components/BooksNotFound/BooksNotFound.testIds";
import { BaseComponent } from "./BaseComponent";

class BooksNotFound extends BaseComponent {
  constructor(selector = `[data-testid=${BooksNotFoundTestIds.root}]`) {
    super(selector);
  }
}

export { BooksNotFound };
