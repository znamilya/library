import { Either, left, right } from "@sweet-monads/either";
import { CheckInBookUseCaseParams, ICheckInBookUseCase } from "../../domain";
import { Borrowing } from "../../domain/entities/Borrowing";
import { IBorrowingsRepo } from "../../domain/repos/IBorrowingsRepo";
import { BaseUseCase } from "../../shared/BaseUseCase";
import { ILogger } from "../../shared/logger/types";
import { AlreadyCompletedException } from "../errors/AlreadyCompletedException";

class CheckInBookUseCase
  extends BaseUseCase<CheckInBookUseCaseParams, Borrowing>
  implements ICheckInBookUseCase
{
  constructor(private borrowingsRepo: IBorrowingsRepo, private logger: ILogger) {
    super();
  }

  async executeImpl({
    bookId,
    memberId,
  }: CheckInBookUseCaseParams): Promise<Either<Error, Borrowing>> {
    const borrowingOrError = await this.borrowingsRepo.findByBookAndMember(bookId, memberId);

    if (borrowingOrError.isLeft()) {
      this.logger.debug(
        `[CheckInBookUseCase] Borrowing not found: ${borrowingOrError.value.message}`,
      );

      return left(borrowingOrError.value);
    }

    const borrowing = borrowingOrError.value;

    if (borrowing.isCompleted()) {
      const error = new AlreadyCompletedException();

      this.logger.debug(`[CheckInBookUseCase] Borrowing not checked in: ${error.message}`);

      return left(error);
    } else {
      borrowing.complete(new Date());
    }

    const updateResultOrError = await this.borrowingsRepo.update(borrowing);

    if (updateResultOrError.isLeft()) {
      this.logger.debug(
        `[CheckInBookUseCase] Borrowing not saved: ${updateResultOrError.value.message}`,
      );

      return left(updateResultOrError.value);
    }

    return updateResultOrError;
  }
}

export { CheckInBookUseCase };
