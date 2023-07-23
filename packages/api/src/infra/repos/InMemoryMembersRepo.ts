import { Member } from "@/domain/entities/Member";
import { IMembersRepo, MemberPersistence } from "@/domain/repos/IMembersRepo";
import { left, right } from "@sweet-monads/either";
import { MembersMapper } from "../../mappers/Members";

const members: MemberPersistence[] = [
  {
    id: "10",
    name: "John Doe",
    isBlocked: false,
    borrowingIds: [],
  },
];

class InMemoryMembersRepo implements IMembersRepo {
  async findAll() {
    return right(members.map(MembersMapper.persistenceToEntity));
  }

  async findById(id: string) {
    const member = members.find((member) => member.id === id);

    if (!member) {
      return left(new Error("member not found"));
    }

    return right(MembersMapper.persistenceToEntity(member));
  }

  async save(member: Member) {
    const index = members.findIndex((b) => b.id === member.id);

    if (index === -1) {
      members.push(MembersMapper.entityToPersistence(member));
    } else {
      members[index] = MembersMapper.entityToPersistence(member);
    }

    return right(true);
  }
}

export { InMemoryMembersRepo };
