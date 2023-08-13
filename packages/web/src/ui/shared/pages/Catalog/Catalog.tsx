import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";

import { useRQFindAllBooks } from "@/modules/books/repos/reactQuery";
import { AddBookButton } from "@/modules/books/ui/components/AddBookButton";
import { AllBooksUseCase } from "@/modules/books/useCases";
import { Stack } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";

export const CatalogPage = () => {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="h1" flexGrow={1}>
          Catalog
        </Typography>

        <AddBookButton />
      </Stack>

      {/* <SearchBookFragment /> */}

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
            <AllBooksUseCase useFindAllBooks={useRQFindAllBooks} />
          </Suspense>
        </ErrorBoundary>
      </Box>
    </div>
  );
};
