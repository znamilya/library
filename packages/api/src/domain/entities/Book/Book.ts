import { left, mergeInOne, right } from "@sweet-monads/either";
import { Entity } from "../../../shared/domain";
import { Guard } from "../../../shared/domain/Guard";
import { Isbn } from "./ISBN";
import { ValidationException } from "../../../shared";

type CreateBookProps = {
  title: string;
  isbn: string;
  author: string;
  isRemoved?: boolean;
};

type BookProps = {
  title: string;
  isbn: Isbn;
  author: string;
  isRemoved: boolean;
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

  get isRemoved() {
    return this.props.isRemoved;
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
      isbn: this.isbn,
      author: this.author,
    };
  }

  static create(props: CreateBookProps, id?: string) {
    const titleGuard = Guard.againstNullOrUndefined(props.title, "title");

    if (titleGuard.isLeft()) {
      return left(new ValidationException("title", titleGuard.value));
    }

    const authorGuard = Guard.againstNullOrUndefined(props.author, "author");

    if (authorGuard.isLeft()) {
      return left(new ValidationException("author", authorGuard.value));
    }

    const isbnOrError = Isbn.create(props.isbn);

    if (isbnOrError.isLeft()) {
      return left(new ValidationException("ISBN", isbnOrError.value));
    }

    return right(
      new Book(
        {
          ...props,
          isbn: isbnOrError.value,
          isRemoved: props.isRemoved ?? false,
        },
        id,
      ),
    );
  }
}

export { Book };
