import { RepoException } from "./RepoException";

class EntityNotFoundException extends RepoException {
  constructor(entityName: string) {
    super(`${entityName} not found`);

    this.name = "EntityNotFoundException";
  }
}

export { EntityNotFoundException };
