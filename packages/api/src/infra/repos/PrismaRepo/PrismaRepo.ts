import { Prisma, PrismaClient } from "@prisma/client";

abstract class PrismaRepo {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  handleError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target;
        const targets = Array.isArray(target) ? target : [target];

        return new Error(`Book with such ${targets.join(" and ")} already exists`);
      }
    }

    return error as Error;
  }
}

export { PrismaRepo };
