import { Request, Response } from "express";
import { ICheckOutBookUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BadParamsException, BaseController, ConflictException } from "../../../../shared";

class CheckoutBookController extends BaseController {
  constructor(private useCase: ICheckOutBookUseCase) {
    super();
  }

  async executeImpl(req: Request, res: Response) {
    const body = req.body;
    const bookOrError = await this.useCase.execute({
      bookId: body.bookId,
      memberId: body.memberId,
    });

    if (bookOrError.isLeft()) {
      const error = bookOrError.value;

      switch (error.constructor) {
        case BadParamsException:
          return res.status(400).send({
            message: error.message,
          });
        case ConflictException:
          return res.status(409).send({
            message: error.message,
          });
        default:
          return this.fail(res, error.message);
      }
    }

    res.json(BooksMapper.entityToDto(bookOrError.value));
  }
}

export { CheckoutBookController };
