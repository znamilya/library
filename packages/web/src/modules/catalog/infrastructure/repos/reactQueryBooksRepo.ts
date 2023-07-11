import { useEffect, useState } from "react";
import { getAllBooks, getBookById } from "../api";
import { Book } from "../../domain";
import { FindAllBooks, FindBookById } from "./BooksRepo";
import { useQuery } from "@tanstack/react-query";

const cacheKeys = {
  allBooks: () => ["allBooks"],
};

export const useFindAllBooks: FindAllBooks = () => {
  const allBooksQuery = useQuery(cacheKeys.allBooks(), {
    queryFn: getAllBooks,
    suspense: true,
  });

  if (allBooksQuery.isSuccess) {
    return allBooksQuery.data;
  }

  return undefined;
};

export const useFindBookById: FindBookById = (bookId: string): Book | null | undefined => {
  const [book, setBook] = useState<Book | null | undefined>(undefined);

  useEffect(() => {
    if (book) return;

    const fetchBook = async () => {
      const newBook = await getBookById(bookId);

      setBook(newBook);
    };

    fetchBook();
  }, [bookId]);

  if (book === undefined) return undefined;

  if (book === null) return null;

  return {
    id: book.id,
    title: book.title,
    author: "author",
    isbn: "123",
    borrowedBy: null,
    reservedBy: null,
    prevBorrowers: [],
  };
};
