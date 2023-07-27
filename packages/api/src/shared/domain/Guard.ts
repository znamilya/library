import { Either, left, right } from "@sweet-monads/either";

export class Guard {
  static againstNullOrUndefined<T>(value: T, argumentName: string): Either<Error, T> {
    if (value === null || value === undefined) {
      return left(new Error(`${argumentName} is null or undefined`));
    }

    return right(value);
  }
}
