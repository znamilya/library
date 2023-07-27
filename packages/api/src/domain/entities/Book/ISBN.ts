import { Either, left, right } from "@sweet-monads/either";

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
    // length must be 10
    let n = isbn.length;
    if (n != 10) return false;

    // Computing weighted sum of
    // first 9 digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      let digit = parseInt(isbn[i]);

      if (isNaN(digit)) return false;

      sum += digit * (10 - i);
    }

    // Checking last digit.
    let last = isbn[9];
    if (last != "X" && isNaN(parseInt(last))) return false;

    // If last digit is 'X', add 10
    // to sum, else add its value.
    sum += last == "X" ? 10 : parseInt(last);

    // Return true if weighted sum
    // of digits is divisible by 11.
    return sum % 11 == 0;
  }

  static create(value: string): Either<Error, Isbn> {
    if (!Isbn.isValid(value)) {
      return left(new Error("Invalid ISBN"));
    }

    return right(new Isbn(value));
  }
}

export { Isbn };
