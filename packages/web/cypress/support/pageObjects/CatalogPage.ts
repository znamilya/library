import { AllBooksFragment } from "../fragmentObjects/AllBooksFragment";
import { BasePage } from "./BasePage";

class CatalogPage extends BasePage {
  url = "/catalog";
  allBooksFragment = new AllBooksFragment();
}

export { CatalogPage };
