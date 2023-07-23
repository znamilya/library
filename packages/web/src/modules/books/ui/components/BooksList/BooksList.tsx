import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import { Book, BookId } from "@/modules/books/domain";
import { CollectionComponentProps } from "@/modules/shared";
import { BooksListTestIds } from "./BooksList.testIds";

type BooksListProps = CollectionComponentProps<
  "books",
  Book,
  {
    renderBorrowButton: (bookId: BookId) => React.ReactNode;
  }
>;

export const BooksList = ({ books, renderBorrowButton, ...props }: BooksListProps) => {
  return (
    <Stack spacing={2} data-testid={BooksListTestIds.root} {...props}>
      {books.map((book) => (
        <div data-testid={BooksListTestIds.item} key={book.id}>
          <Typography variant="h6">
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
          {renderBorrowButton(book.id)}
        </div>
      ))}
    </Stack>
  );
};
