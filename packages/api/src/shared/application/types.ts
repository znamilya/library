import { Either } from "@sweet-monads/either";

export type IUseCase<TParams, TResult> = {
  execute(params: TParams): Promise<Either<Error, TResult>>;
};
