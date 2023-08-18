import { UseCaseException } from "../../../shared";

class AlreadyCompletedException extends UseCaseException {
  constructor() {
    super("Borrowing is already completed.");
  }
}

export { AlreadyCompletedException };
