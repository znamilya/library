import { left, right } from "@sweet-monads/either";
import { Member } from "../../domain/entities/Member";
import { IMembersRepo } from "../../domain/repos/IMembersRepo";
import { MembersMapper } from "../../mappers/Members";
import { DbContext } from "./InMemory/types";

class InMemoryMembersRepo implements IMembersRepo {
  constructor(private dbContext: DbContext) {}

  async findAll() {
    const { members } = this.dbContext;

    return right(members.map(MembersMapper.persistenceToEntity));
  }

  async findById(id: string) {
    const member = this.dbContext.members.find((member) => member.id === id);

    if (!member) {
      return left(new Error("member not found"));
    }

    return right(MembersMapper.persistenceToEntity(member));
  }

  async save(member: Member) {
    const index = this.dbContext.members.findIndex((b) => b.id === member.id);

    if (index === -1) {
      this.dbContext.members.push(MembersMapper.entityToPersistence(member));
    } else {
      this.dbContext.members[index] = MembersMapper.entityToPersistence(member);
    }

    return right(true);
  }
}

export { InMemoryMembersRepo };
