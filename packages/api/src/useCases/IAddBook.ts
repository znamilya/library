import { Book } from "@/domain/entities/Book";
import { NewBookDto } from "@/dtos/Book";
import { Either } from "@sweet-monads/either";

type IUseCase<TParams, TResult> = {
  execute(params: TParams): Promise<Either<Error, TResult>>;
};

export type IAddBookUseCase = IUseCase<NewBookDto, Book>;
