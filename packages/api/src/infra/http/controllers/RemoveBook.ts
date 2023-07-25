import { Request, Response } from "express";
import { BooksMapper } from "../../../mappers/Books";
import { BaseController } from "../../../shared";
import { RemoveBookUseCase } from "../../../useCases/RemoveBook";

class RemoveBookController extends BaseController {
  useCase: RemoveBookUseCase;

  constructor(useCase: RemoveBookUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const bookId = req.params.bookId;

    const book = await this.useCase.execute(bookId);

    if (book.isLeft()) {
      return res.status(500).send(book.value.message);
    }

    res.json(BooksMapper.entityToDto(book.value));
  }
}

export { RemoveBookController };
