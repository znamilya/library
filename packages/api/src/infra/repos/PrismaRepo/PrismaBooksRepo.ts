import { left, right } from "@sweet-monads/either";
import { Book } from "../../../domain/entities/Book";
import { FindAllParams, IBooksRepo } from "../../../domain/repos/IBooksRepo";
import { BooksMapper } from "../../../mappers/Books";
import { EntityNotFoundException } from "../../../shared";
import { PrismaRepo } from "./PrismaRepo";

class PrismaBooksRepo extends PrismaRepo implements IBooksRepo {
  async findAll({ pagination }: FindAllParams = {}) {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          isRemoved: false,
        },
        orderBy: {
          title: "asc",
        },
        skip: pagination?.page ? (pagination.page - 1) * pagination.limit : 0,
        take: pagination?.limit,
      });

      return right(books.map(BooksMapper.persistenceToEntity));
    } catch (error) {
      console.log(error);

      return left(this.handleError(error));
    }
  }

  async findAllEmbedded() {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          isRemoved: false,
        },
        include: {
          borrowings: {
            select: {
              id: true,
              checkOutDate: true,
              checkInDate: true,
              dueDate: true,
              member: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      return right(books);
    } catch (error) {
      return left(this.handleError(error));
    }
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
        orderBy: {
          title: "asc",
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
        return left(new EntityNotFoundException("Book"));
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

  async save(newBook: Book) {
    try {
      const book = await this.prisma.book.create({
        data: BooksMapper.entityToPersistence(newBook),
      });

      return right(BooksMapper.persistenceToEntity(book));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async update(newBook: Book) {
    try {
      const book = await this.prisma.book.update({
        where: {
          id: newBook.id,
        },
        data: BooksMapper.entityToPersistence(newBook),
      });

      return right(BooksMapper.persistenceToEntity(book));
    } catch (error) {
      return left(this.handleError(error));
    }
  }
}

export { PrismaBooksRepo };
