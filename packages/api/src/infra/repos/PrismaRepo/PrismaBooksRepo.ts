import { left, right } from "@sweet-monads/either";
import { IBooksRepo } from "../../../domain/repos/IBooksRepo";
import { BooksMapper } from "../../../mappers/Books";
import { PrismaRepo } from "./PrismaRepo";
import { Book } from "../../../domain/entities/Book";

class PrismaBookRepo extends PrismaRepo implements IBooksRepo {
  async findAll() {
    const books = await this.prisma.book.findMany({
      where: {
        isRemoved: false,
      },
    });

    return right(books.map(BooksMapper.persistenceToEntity));
  }

  async findByTitle(title: string) {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          isRemoved: false,
          title: {
            contains: title,
          },
        },
      });

      return right(books.map(BooksMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findById(bookId: string) {
    try {
      const book = await this.prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!book) {
        return left(new Error("Not found"));
      }

      return right(BooksMapper.persistenceToEntity(book));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async removeById(bookId: string) {
    try {
      const book = await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          isRemoved: true,
        },
      });

      return right(BooksMapper.persistenceToEntity(book));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async save(book: Book) {
    try {
      await this.prisma.book.create({
        data: BooksMapper.entityToPersistence(book),
      });

      return right(true);
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async update(book: Book) {
    try {
      await this.prisma.book.update({
        where: {
          id: book.id,
        },
        data: BooksMapper.entityToPersistence(book),
      });

      return right(true);
    } catch (error) {
      return left(this.handleError(error));
    }
  }
}

export { PrismaBookRepo };
