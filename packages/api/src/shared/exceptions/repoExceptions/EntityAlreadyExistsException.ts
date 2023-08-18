import { RepoException } from "./RepoException";

class EntityAlreadyExistsException extends RepoException {
  constructor(fields: string[]) {
    super(`Entity already exists. Fields: ${fields.join(", ")}`);

    this.name = "EntityAlreadyExistsException";
  }
}

export { EntityAlreadyExistsException };
