import { useEffect, useState } from "react";
import { Book } from "../../domain";
import { IFindBookByIdRepo } from "../BooksRepo";
import { getBookById } from "../../infrastructure/api";
import { useRQFindAllBooks } from "./useFindAllBooks";

const cacheKeys = {
  allBooks: () => ["books", "all"],
};

export const useRQFindBookById: IFindBookByIdRepo = (bookId: string) => {
  const books = useRQFindAllBooks();

  if (!books) {
    return undefined;
  }

  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return null;
  }

  return book;
};
