import { UseCaseException } from "./UseCaseException";

class ConflictException extends UseCaseException {
  cause: Error;

  constructor(cause: Error) {
    super("Can't save entity", cause);

    this.cause = cause;
  }
}

export { ConflictException };
