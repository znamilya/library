import { MemberPersistence } from "../domain/repos/IMembersRepo";
import { Member } from "../domain/entities/Member/Member";

class MembersMapper {
  static entityToPersistence(member: Member): MemberPersistence {
    return {
      id: member.id,
      name: member.name,
      isBlocked: member.isBlocked,
      borrowingIds: member.borrowingIds,
    };
  }

  static persistenceToEntity(memberPersistence: MemberPersistence): Member {
    return Member.create(
      {
        name: memberPersistence.name,
        isBlocked: memberPersistence.isBlocked,
        borrowingIds: memberPersistence.borrowingIds,
      },
      memberPersistence.id,
    );
  }

  static entityToDto(member: Member): any {
    return {
      id: member.id,
      name: member.name,
      isBlocked: member.isBlocked,
      borrowingIds: member.borrowingIds,
    };
  }
}

export { MembersMapper };
