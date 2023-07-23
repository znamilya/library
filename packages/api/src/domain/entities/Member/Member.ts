import { Entity } from "../../../shared";

type MemberProps = {
  name: string;
  isBlocked: boolean;
  borrowingIds: string[];
};

class Member extends Entity<MemberProps> {
  get name() {
    return this.props.name;
  }

  get borrowingIds() {
    return this.props.borrowingIds;
  }

  get isBlocked() {
    return this.props.isBlocked;
  }

  canBorrowMoreBooks(): boolean {
    return this.props.borrowingIds.length < 3;
  }

  static create(props: MemberProps, id?: string) {
    return new Member(props, id);
  }
}

export { Member };
