import { Member as PrismaMember } from "@prisma/client";
import { Either } from "@sweet-monads/either";
import { Member } from "../entities/Member/Member";

export type MemberPersistence = Omit<PrismaMember, "createdAt" | "updatedAt">;

export type IMembersRepo = {
  findAll(): Promise<Either<Error, Member[]>>;
  findById(id: string): Promise<Either<Error, Member>>;
};
