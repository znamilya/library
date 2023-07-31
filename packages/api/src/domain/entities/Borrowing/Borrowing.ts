import { Entity } from "../../../shared";
import { Book } from "../Book";

type BorrowingProps = {
  book: Book;
  memberId: string;
  checkOutDate: Date;
  dueDate: Date;
  checkInDate: Date | null;
};

class Borrowing extends Entity<BorrowingProps> {
  get book() {
    return this.props.book;
  }

  get memberId() {
    return this.props.memberId;
  }

  get checkOutDate() {
    return this.props.checkOutDate;
  }

  get dueDate() {
    return this.props.dueDate;
  }

  get checkInDate() {
    return this.props.checkInDate;
  }

  complete(checkInDate: Date) {
    this.props.checkInDate = checkInDate;
  }

  static create(props: BorrowingProps, id?: string) {
    return new Borrowing(props, id);
  }
}

export { Borrowing };
