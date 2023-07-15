import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { Book } from "@/modules/books/domain";
import { CollectionComponentProps } from "@/modules/shared";
import { BooksListTestIds } from "./BooksList.testIds";

type BooksListProps = CollectionComponentProps<"books", Book>;

export const BooksList = ({ books, ...props }: BooksListProps) => {
  return (
    <Stack spacing={4} data-testid={BooksListTestIds.root} {...props}>
      {books.map((book) => (
        <div data-testid={BooksListTestIds.item} key={book.id}>
          <Typography variant="h4">
            <MuiLink component={Link} to={`/catalog/${book.id}`}>
              {book.title}
            </MuiLink>
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            mt={0.5}
            data-testid={BooksListTestIds.itemMetaInfo}
          >
            Author: {book.author}, ISBN: {book.isbn}
          </Typography>
          <Typography variant="body1" mt={1}>
            {book.description}
          </Typography>
        </div>
      ))}
    </Stack>
  );
};
