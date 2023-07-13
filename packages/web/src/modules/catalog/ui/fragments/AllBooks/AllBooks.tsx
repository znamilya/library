import { Link } from "react-router-dom";

import { useGetAllBooksCase } from "../../../useCases";

export const AllBooksFragment = () => {
  const allBooks = useGetAllBooksCase();

  if (!allBooks) {
    return null;
  }

  if (!allBooks.length) {
    return <div>No books found</div>;
  }

  return (
    <div>
      {allBooks.map((book) => (
        <div key={book.id}>
          <Link to={`/catalog/${book.id}`}>{book.title}</Link>
        </div>
      ))}
    </div>
  );
};
