import { Box, BoxProps } from "@mui/material";
import { BooksNotFoundTestIds } from "./BooksNotFound.testIds";

type BooksNotFoundProps = BoxProps;

export const BooksNotFound = (props: BooksNotFoundProps) => {
  return (
    <Box data-testid={BooksNotFoundTestIds.root} {...props}>
      No books found
    </Box>
  );
};
