import { Request, Response } from "express";
import { BooksMapper } from "../../../mappers/Books";
import { BaseController } from "../../../shared";
import { AddBookUseCase } from "../../../useCases/AddBook";

class AddBookController extends BaseController {
  useCase: AddBookUseCase;

  constructor(useCase: AddBookUseCase) {
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
      return res.status(500).send(book.value.message);
    }

    res.json(BooksMapper.entityToDto(book.value));
  }
}

export { AddBookController };
