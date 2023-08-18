import { UseCaseException } from "../../shared/UseCaseException";

class AlreadyCompletedException extends UseCaseException {
  constructor() {
    super("Borrowing is already completed.");
  }
}

export { AlreadyCompletedException };
