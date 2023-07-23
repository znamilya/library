import { CheckoutBookUseCase } from "@/useCases/CheckoutBook";
import { Request, Response } from "express";
import { BooksMapper } from "../../../mappers/Books";
import { BaseController } from "../../../shared";

class CheckoutBookController extends BaseController {
  useCase: CheckoutBookUseCase;

  constructor(useCase: CheckoutBookUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const body = req.body;
    const book = await this.useCase.execute(body.bookId, body.memberId);

    if (book.isLeft()) {
      return res.status(500).send(book.value.message);
    }

    res.json(BooksMapper.entityToDto(book.value));
  }
}

export { CheckoutBookController };
