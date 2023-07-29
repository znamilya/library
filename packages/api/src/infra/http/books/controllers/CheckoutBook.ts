import { Request, Response } from "express";
import { ICheckOutBookUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BaseController } from "../../../../shared";

class CheckoutBookController extends BaseController {
  useCase: ICheckOutBookUseCase;

  constructor(useCase: ICheckOutBookUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const body = req.body;
    const book = await this.useCase.execute({
      bookId: body.bookId,
      memberId: body.memberId,
    });

    if (book.isLeft()) {
      return res.status(500).send(book.value.message);
    }

    res.json(BooksMapper.entityToDto(book.value));
  }
}

export { CheckoutBookController };
