import { AllBooksFragment, SearchBookFragment } from "@/modules/catalog";
import { Suspense } from "react";

export const CatalogPage = () => {
  return (
    <div>
      <h1>Catalog</h1>

      <SearchBookFragment />

      <Suspense fallback="...">
        <AllBooksFragment />
      </Suspense>
    </div>
  );
};
