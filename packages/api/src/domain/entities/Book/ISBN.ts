import { Either, left, right } from "@sweet-monads/either";
import { Guard } from "../../../shared/domain/Guard";

class Isbn {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  // https://www.geeksforgeeks.org/program-check-isbn/
  static isValid(isbn: string): boolean {
    let n = isbn.length;
    if (n != 10) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(isbn[i]);

      if (isNaN(digit)) return false;

      sum += digit * (10 - i);
    }

    let last = isbn[9];
    if (last != "X" && isNaN(parseInt(last))) return false;

    sum += last == "X" ? 10 : parseInt(last);

    return sum % 11 == 0;
  }

  static create(value: string): Either<Error, Isbn> {
    const valueGuard = Guard.againstNullOrUndefined(value, "ISBN");

    if (valueGuard.isLeft()) {
      return left(valueGuard.value);
    }

    if (!Isbn.isValid(value)) {
      return left(new Error("Invalid ISBN"));
    }

    return right(new Isbn(value));
  }
}

export { Isbn };
