import { UseCaseException } from "../../shared/UseCaseException";

class BadParamsException extends UseCaseException {
  cause: Error;

  constructor(cause: Error, param: string) {
    super(`Bad params: ${param}`, cause);

    this.cause = cause;
  }
}

export { BadParamsException };
