import { useQuery } from "@tanstack/react-query";
import { IFindBooksRepo } from "../BooksRepo";
import { getAllBooks } from "../../infrastructure/api";

export const allBooksCacheKey = () => ["books", "all"];

export const useRQFindAllBooks: IFindBooksRepo = () => {
  const allBooksQuery = useQuery(allBooksCacheKey(), {
    queryFn: getAllBooks,
    suspense: true,
  });

  if (allBooksQuery.isSuccess) {
    return allBooksQuery.data;
  }

  return undefined;
};
