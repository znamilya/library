import { Either, left, right } from "@sweet-monads/either";
import { ArgumentNullOfUndefinedException } from "../exceptions";

export class Guard {
  static againstNullOrUndefined<T>(
    value: T,
    argumentName: string,
  ): Either<ArgumentNullOfUndefinedException, T> {
    if (value === null || value === undefined) {
      return left(new ArgumentNullOfUndefinedException(argumentName));
    }

    return right(value);
  }
}
