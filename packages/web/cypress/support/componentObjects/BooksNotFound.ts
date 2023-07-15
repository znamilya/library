import { BooksNotFoundTestIds } from "../../../src/modules/books/ui/components/BooksNotFound/BooksNotFound.testIds";
import { BaseComponent } from "./BaseComponent";

class BooksNotFound extends BaseComponent {
  constructor(selector = `[data-testid=${BooksNotFoundTestIds.root}]`) {
    super(selector);
  }
}

export { BooksNotFound };
