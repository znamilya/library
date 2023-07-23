import { Either } from "@sweet-monads/either";
import { Member } from "../entities/Member/Member";

export type MemberPersistence = {
  id: string;
  name: string;
  isBlocked: boolean;
  borrowingIds: string[];
};

export type IMembersRepo = {
  findAll(): Promise<Either<Error, Member[]>>;
  findById(id: string): Promise<Either<Error, Member>>;
};
