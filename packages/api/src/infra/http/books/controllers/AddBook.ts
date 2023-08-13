import { Request, Response } from "express";
import { IAddBookUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BaseController } from "../../../../shared";

class AddBookController extends BaseController {
  useCase: IAddBookUseCase;

  constructor(useCase: IAddBookUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const body = req.body;

    if (!body) {
      return res.status(400).json({
        message: "Missing body",
      });
    }

    const book = await this.useCase.execute({
      title: body.title,
      author: body.author,
      isbn: body.isbn,
    });

    if (book.isLeft()) {
      return res.status(500).send({
        message: book.value.message,
      });
    }

    res.json(BooksMapper.entityToDto(book.value));
  }
}

export { AddBookController };
