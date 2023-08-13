import { MemberPersistence } from "../domain/repos/IMembersRepo";
import { Member } from "../domain/entities/Member/Member";

class MembersMapper {
  static entityToPersistence(member: Member): MemberPersistence {
    return {
      id: member.id,
      name: member.name,
      isBlocked: member.isBlocked,
    };
  }

  static persistenceToEntity(memberPersistence: MemberPersistence): Member {
    const memberOrError = Member.create(
      {
        name: memberPersistence.name,
        isBlocked: memberPersistence.isBlocked,
      },
      memberPersistence.id,
    );

    return memberOrError as Member;
  }

  static entityToDto(member: Member): any {
    return {
      id: member.id,
      name: member.name,
      isBlocked: member.isBlocked,
    };
  }
}

export { MembersMapper };
