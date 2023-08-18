import { Either, left, right } from "@sweet-monads/either";
import {
  BadParamsException,
  ConflictException,
  UnknownEntityException,
} from "../application/errors";
import { UseCaseException } from "./UseCaseException";
import {
  EntityAlreadyExistsException,
  EntityNotFoundException,
  ValidationException,
} from "./exceptions";

abstract class BaseUseCase<TParams, TReturn> {
  protected abstract executeImpl(params: TParams): Promise<Either<Error, TReturn>>;

  public async execute(params: TParams): Promise<Either<UseCaseException, TReturn>> {
    try {
      const resultOrError = await this.executeImpl(params);

      if (resultOrError.isLeft()) {
        const error = resultOrError.value;

        if (error instanceof EntityAlreadyExistsException) {
          return left(new ConflictException(error));
        }

        if (error instanceof EntityNotFoundException) {
          return left(new UnknownEntityException(error));
        }

        if (error instanceof ValidationException) {
          return left(new BadParamsException(error, error.message));
        }

        if (error instanceof UseCaseException) {
          return left(error);
        }

        return left(new UseCaseException("Unknown error", error));
      }

      return right(resultOrError.value);
    } catch (error) {
      const finalError = error instanceof Error ? error : new Error();

      return left(new UseCaseException("Unknown error", finalError));
    }
  }
}

export { BaseUseCase };
