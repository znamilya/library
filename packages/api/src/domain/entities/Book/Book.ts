import { left, mergeInOne, right } from "@sweet-monads/either";
import { Entity } from "../../../shared/domain";
import { Guard } from "../../../shared/domain/Guard";
import { Isbn } from "./ISBN";

type CreateBookProps = {
  title: string;
  isbn: string;
  author: string;
  borrowingIds: string[];
};

type BookProps = {
  title: string;
  isbn: Isbn;
  author: string;
  borrowingIds: string[];
};

class Book extends Entity<BookProps> {
  get title() {
    return this.props.title;
  }

  get isbn() {
    return this.props.isbn.value;
  }

  get author() {
    return this.props.author;
  }

  get borrowingIds() {
    return this.props.borrowingIds;
  }

  checkOut(borrowingId: string) {
    this.props.borrowingIds.push(borrowingId);
  }

  checkIn(borrowingId: string) {
    this.props.borrowingIds = this.props.borrowingIds.filter((id) => id !== borrowingId);
  }

  isAvailable(): boolean {
    return this.props.borrowingIds.length === 0;
  }

  static create(props: CreateBookProps, id?: string) {
    const isbnOrError = Isbn.create(props.isbn);
    const titleGuard = Guard.againstNullOrUndefined(props.title, "title");
    const authorGuard = Guard.againstNullOrUndefined(props.author, "author");

    const guardsResult = mergeInOne([titleGuard, authorGuard]);

    if (guardsResult.isLeft()) {
      return left(guardsResult.value);
    }

    if (isbnOrError.isLeft()) {
      return left(isbnOrError.value);
    }

    return right(
      new Book(
        {
          ...props,
          isbn: isbnOrError.value,
        },
        id,
      ),
    );
  }
}

export { Book };
