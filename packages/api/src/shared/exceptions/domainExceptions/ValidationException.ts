import { DomainException } from "./DomainException";

class ValidationException extends DomainException {
  constructor(field: string, public cause?: Error) {
    super(`Entity is not valid. Field: ${field}`);

    this.name = "ValidationException";
  }
}

export { ValidationException };
