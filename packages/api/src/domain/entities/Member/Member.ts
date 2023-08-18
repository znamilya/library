import { UserStatus } from "@prisma/client";
import { Entity } from "../../../shared";

type MemberProps = {
  name: string;
  // isBlocked: boolean;
  email: string;
  status: UserStatus;
  borrowingIds: string[];
};

class Member extends Entity<MemberProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get status() {
    return this.props.status;
  }

  get borrowingIds() {
    return this.props.borrowingIds;
  }

  // get isBlocked() {
  //   return this.props.isBlocked;
  // }

  static create(props: MemberProps, id?: string) {
    return new Member(props, id);
  }
}

export { Member };
