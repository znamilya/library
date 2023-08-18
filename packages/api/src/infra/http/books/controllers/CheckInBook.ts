import { Request, Response } from "express";
import { ICheckInBookUseCase } from "../../../../domain";
import { BorrowingsMapper } from "../../../../mappers/Borrowings";
import { BaseController } from "../../../../shared";
import {
  AlreadyCompletedException,
  BadParamsException,
  UnknownEntityException,
} from "../../../../application/errors";

class CheckInBookController extends BaseController {
  constructor(private useCase: ICheckInBookUseCase) {
    super();
  }

  async executeImpl(req: Request, res: Response) {
    const body = req.body;

    const borrowingOrError = await this.useCase.execute({
      bookId: body.bookId,
      memberId: body.memberId,
    });

    if (borrowingOrError.isLeft()) {
      const error = borrowingOrError.value;

      switch (error.constructor) {
        case BadParamsException:
          return res.status(400).send({
            message: error.message,
          });
        case UnknownEntityException:
          return res.status(404).send({
            message: error.message,
          });
        case AlreadyCompletedException:
          return res.status(422).send({
            message: error.message,
          });
        default:
          return this.fail(res, error.message);
      }
    }

    res.json(BorrowingsMapper.entityToDto(borrowingOrError.value));
  }
}

export { CheckInBookController };
