import { left, right } from "@sweet-monads/either";
import { IBorrowingsRepo } from "../../../domain/repos/IBorrowingsRepo";
import { BorrowingsMapper } from "../../../mappers/Borrowings";
import { EntityNotFoundException } from "../../../shared";
import { PrismaRepo } from "./PrismaRepo";
import { Borrowing } from "../../../domain/entities/Borrowing";

class PrismaBorrowingsRepo extends PrismaRepo implements IBorrowingsRepo {
  async findAll() {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        orderBy: {
          createdAt: "asc",
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findAllActive() {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          checkInDate: null,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findAllActiveOverdue() {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          checkInDate: null,
          dueDate: {
            lt: new Date(),
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findAllCompleted() {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          checkInDate: {
            not: null,
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findAllByMemberId(memberId: string) {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          memberId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findAllByBookId(bookId: string) {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          bookId,
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findOneById(borrowingId: string) {
    try {
      const borrowing = await this.prisma.borrowing.findUnique({
        where: {
          id: borrowingId,
        },
      });

      if (!borrowing) {
        return left(new EntityNotFoundException("Borrowing"));
      }

      return right(BorrowingsMapper.persistenceToEntity(borrowing));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findOneByBookIdAndMemberId(bookId: string, memberId: string) {
    try {
      const borrowing = await this.prisma.borrowing.findFirst({
        where: {
          bookId,
          memberId,
        },
      });

      if (!borrowing) {
        return left(new EntityNotFoundException("Borrowing"));
      }

      return right(BorrowingsMapper.persistenceToEntity(borrowing));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async save(borrowing: Borrowing) {
    try {
      await this.prisma.borrowing.create({
        data: BorrowingsMapper.entityToPersistence(borrowing),
      });

      return right(true);
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async update(newBorrowing: Borrowing) {
    try {
      const borrowing = await this.prisma.borrowing.update({
        where: {
          id: newBorrowing.id,
        },
        data: BorrowingsMapper.entityToPersistence(newBorrowing),
      });

      return right(BorrowingsMapper.persistenceToEntity(borrowing));
    } catch (error) {
      return left(this.handleError(error));
    }
  }
}

export { PrismaBorrowingsRepo };
