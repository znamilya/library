import { MemberPersistence } from "../domain/repos/IMembersRepo";
import { Member } from "../domain/entities/Member/Member";

class MembersMapper {
  static entityToPersistence(member: Member): MemberPersistence {
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      status: member.status,
      borrowings: member.borrowingIds.map((borrowingId) => ({ id: borrowingId })),
    };
  }

  static persistenceToEntity(memberPersistence: MemberPersistence): Member {
    const memberOrError = Member.create(
      {
        name: memberPersistence.name,
        email: memberPersistence.email,
        status: memberPersistence.status,
        borrowingIds: memberPersistence.borrowings.map((borrowing) => borrowing.id),
      },
      memberPersistence.id,
    );

    return memberOrError as Member;
  }

  static entityToDto(member: Member): any {
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      status: member.status,
    };
  }
}

export { MembersMapper };
