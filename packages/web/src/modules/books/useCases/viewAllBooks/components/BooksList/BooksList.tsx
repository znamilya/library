import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";

import { Book, BookId } from "@/modules/books/domain";
import { CollectionComponentProps } from "@/modules/shared";

type BooksListProps = CollectionComponentProps<
  "books",
  Book,
  {
    onBookCheckIn: (bookId: BookId, borrowingId: string) => void;
    renderBorrowButton?: (bookId: BookId) => React.ReactNode;
  }
>;

export const BooksList = ({
  books,
  renderBorrowButton,
  onBookCheckIn,
  ...props
}: BooksListProps) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">ISBN</TableCell>
            <TableCell align="right">Available</TableCell>
            <TableCell align="right">Borrowed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Link component={RouterLink} to={`/catalog/${book.id}`}>
                  {book.title}
                </Link>
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell align="right">{book.isbn}</TableCell>
              <TableCell align="right">{book.borrowings.length}</TableCell>
              <TableCell align="right">{book.borrowings.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
