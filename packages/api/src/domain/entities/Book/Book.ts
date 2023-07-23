import { Entity } from "../../../shared/domain";

type BookProps = {
  title: string;
  isbn: string;
  author: string;
  borrowingIds: string[];
};

class Book extends Entity<BookProps> {
  get title() {
    return this.props.title;
  }

  get isbn() {
    return this.props.isbn;
  }

  get author() {
    return this.props.author;
  }

  get borrowingIds() {
    return this.props.borrowingIds;
  }

  checkout(borrowingId: string) {
    this.props.borrowingIds.push(borrowingId);
  }

  checkin(borrowingId: string) {
    this.props.borrowingIds = this.props.borrowingIds.filter((id) => id !== borrowingId);
  }

  isAvailable(): boolean {
    return this.props.borrowingIds.length === 0;
  }

  static create(props: BookProps, id?: string) {
    return new Book(props, id);
  }
}

export { Book };
