import { Book, BookId } from "../domain";

export type IFindBooksRepo = () => Book[] | undefined;

export type IFindBookByIdRepo = (bookId: BookId) => Book | null | undefined;

export type ISaveBookRepo = () => {
  execute: (params: { title: string; author: string; isbn: string }) => void;
  isExecuting: boolean;
};

export type ICheckInBookRepo = () => {
  execute: (bookId: BookId) => void;
  isExecuting: boolean;
};
