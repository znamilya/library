import { UseCaseException } from "../../shared/UseCaseException";

class UnknownEntityException extends UseCaseException {
  cause: Error;

  constructor(cause: Error) {
    super("Entity doesn't not exist", cause);

    this.cause = cause;
  }
}

export { UnknownEntityException };
