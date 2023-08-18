import { Request, Response } from "express";
import { IAddBookUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BaseController } from "../../../../shared";
import { BadParamsException, ConflictException } from "../../../../application/errors";

class AddBookController extends BaseController {
  constructor(private useCase: IAddBookUseCase) {
    super();
  }

  async executeImpl(req: Request, res: Response) {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        message: "Missing body",
      });
    }

    const bookOrError = await this.useCase.execute({
      title: body.title,
      author: body.author,
      isbn: body.isbn.value,
    });

    if (bookOrError.isLeft()) {
      const error = bookOrError.value;

      switch (error.constructor) {
        case BadParamsException:
          return res.status(400).send({ message: error.message });
        case ConflictException:
          return res.status(409).send({ message: error.message });
        default:
          return this.fail(res, error.message);
      }
    }

    res.json(BooksMapper.entityToDto(bookOrError.value));
  }
}

export { AddBookController };
