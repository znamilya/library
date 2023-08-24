import { Book as PrismaBook } from "@prisma/client";
import { Either } from "@sweet-monads/either";

import { Book } from "../entities/Book/Book";

export type BookPersistence = Omit<PrismaBook, "createdAt" | "updatedAt">;

export type IPagination = {
  page: number;
  limit: number;
};

export type FindAllParams = {
  pagination?: IPagination;
};

export interface IBooksRepo {
  findAll(params?: FindAllParams): Promise<Either<Error, Book[]>>;
  findByTitle(title: string): Promise<Either<Error, Book[]>>;
  findById(id: string): Promise<Either<Error, Book>>;
  removeById(id: string): Promise<Either<Error, Book>>;
  save(book: Book): Promise<Either<Error, Book>>;
  update(book: Book): Promise<Either<Error, Book>>;
}
