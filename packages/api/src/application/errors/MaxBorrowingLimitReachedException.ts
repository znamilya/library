import { UseCaseException } from "../../shared/UseCaseException";

class MaxBorrowingLimitReachedException extends UseCaseException {
  constructor() {
    super("Max borrowing limit reached.");
  }
}

export { MaxBorrowingLimitReachedException };
