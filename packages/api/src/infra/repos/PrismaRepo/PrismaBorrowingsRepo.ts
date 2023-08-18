import { left, right } from "@sweet-monads/either";
import { IBorrowingsRepo } from "../../../domain/repos/IBorrowingsRepo";
import { BorrowingsMapper } from "../../../mappers/Borrowings";
import { EntityNotFoundException } from "../../../shared";
import { PrismaRepo } from "./PrismaRepo";
import { Borrowing } from "../../../domain/entities/Borrowing";

class PrismaBorrowingsRepo extends PrismaRepo implements IBorrowingsRepo {
  async findAll() {
    try {
      const borrowings = await this.prisma.borrowing.findMany();

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findActive() {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          checkInDate: null,
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findManyByMemberId(memberId: string) {
    try {
      const borrowings = await this.prisma.borrowing.findMany({
        where: {
          memberId,
        },
      });

      return right(borrowings.map(BorrowingsMapper.persistenceToEntity));
    } catch (error) {
      return left(this.handleError(error));
    }
  }

  async findByBookId(bookId: string) {
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

  async findById(borrowingId: string) {
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

  async findByBookAndMember(bookId: string, memberId: string) {
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
