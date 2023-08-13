import { Entity } from "../../../shared";

type MemberProps = {
  name: string;
  isBlocked: boolean;
};

class Member extends Entity<MemberProps> {
  get name() {
    return this.props.name;
  }

  get isBlocked() {
    return this.props.isBlocked;
  }

  static create(props: MemberProps, id?: string) {
    return new Member(props, id);
  }
}

export { Member };
