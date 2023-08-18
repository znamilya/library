import { Request, Response } from "express";
import { IRemoveBookUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BaseController } from "../../../../shared";
import { UnknownEntityException } from "../../../../application/errors";

class RemoveBookController extends BaseController {
  constructor(private useCase: IRemoveBookUseCase) {
    super();
  }

  async executeImpl(req: Request, res: Response) {
    const bookId = req.params.bookId;

    const bookOrError = await this.useCase.execute({ bookId });

    if (bookOrError.isLeft()) {
      const error = bookOrError.value;

      switch (error.constructor) {
        case UnknownEntityException: {
          return res.status(404).send({
            message: error.message,
          });
        }
        default:
          return this.fail(res, error.message);
      }
    }

    res.json(BooksMapper.entityToDto(bookOrError.value));
  }
}

export { RemoveBookController };
