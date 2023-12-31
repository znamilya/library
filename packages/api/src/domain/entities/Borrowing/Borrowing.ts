import { Entity } from "../../../shared";

type BorrowingProps = {
  bookId: string;
  memberId: string;
  checkOutDate: Date;
  dueDate: Date;
  checkInDate: Date | null;
};

class Borrowing extends Entity<BorrowingProps> {
  get bookId() {
    return this.props.bookId;
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

  isCompleted() {
    return this.props.checkInDate !== null;
  }

  toJson() {
    return {
      id: this.id,
      book: this.bookId,
      memberId: this.memberId,
      checkOutDate: this.checkOutDate,
      dueDate: this.dueDate,
      checkInDate: this.checkInDate,
    };
  }

  static create(props: BorrowingProps, id?: string) {
    return new Borrowing(props, id);
  }
}

export { Borrowing };
