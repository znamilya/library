import { Either } from "@sweet-monads/either";

abstract class BaseUseCase {
  abstract execute(...args: any[]): Promise<Either<Error, any>>;
}

export { BaseUseCase };
