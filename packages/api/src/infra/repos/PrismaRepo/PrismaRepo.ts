import { Prisma, PrismaClient } from "@prisma/client";
import { EntityAlreadyExistsException } from "../../../shared/exceptions/repoExceptions/EntityAlreadyExistsException";
import { EntityNotFoundException } from "../../../shared/exceptions/repoExceptions/EntityNotFoundException";

abstract class PrismaRepo {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  handleError(error: unknown): Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target;
        const targets = Array.isArray(target) ? target : [target];

        return new EntityAlreadyExistsException(targets);
      }

      if (error.code === "P2025") {
        return new EntityNotFoundException("Book");
      }
    }

    return new Error("Unexpected error");
  }
}

export { PrismaRepo };
