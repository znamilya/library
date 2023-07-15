import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";

import { AllBooksFragment, SearchBookFragment } from "@/modules/books";
import { ErrorBoundary } from "react-error-boundary";

export const CatalogPage = () => {
  return (
    <div>
      <Typography variant="h1">Catalog</Typography>

      <SearchBookFragment />

      <Box mt={3}>
        <ErrorBoundary
          fallback={
            // TODO: Extract this to a shared component
            <div>
              <Typography component="p" variant="h2">
                Ooops...
              </Typography>
              <Typography variant="body1">Something went wrong while loading books</Typography>
            </div>
          }
        >
          <Suspense fallback="Loading books...">
            <AllBooksFragment />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </div>
  );
};
