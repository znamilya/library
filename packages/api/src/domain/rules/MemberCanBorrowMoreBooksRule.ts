import { Member } from "../entities/Member";

type IDomainRule = {
  isSatisfiedBy: (entity: any) => boolean;
};

const MAX_BORROWING_PER_MEMBER = 2;

class MemberCanBorrowMoreBooksRule implements IDomainRule {
  isSatisfiedBy(member: Member) {
    return member.borrowingIds.length < MAX_BORROWING_PER_MEMBER;
  }
}

export { MemberCanBorrowMoreBooksRule };
