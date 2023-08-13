import { Book as PrismaBook } from "@prisma/client";
import { Either } from "@sweet-monads/either";

import { Book } from "../entities/Book/Book";

export type BookPersistence = Omit<PrismaBook, "createdAt" | "updatedAt">;

export type IBooksRepo = {
  findAll(): Promise<Either<Error, Book[]>>;
  findByTitle(title: string): Promise<Either<Error, Book[]>>;
  findById(id: string): Promise<Either<Error, Book>>;
  removeById(id: string): Promise<Either<Error, Book>>;
  save(book: Book): Promise<Either<Error, boolean>>;
  update(book: Book): Promise<Either<Error, boolean>>;
};
