import { CheckInBookUseCase } from "@/useCases/CheckinBook";
import { Request, Response } from "express";
import { BooksMapper } from "../../../mappers/Books";
import { BaseController } from "../../../shared";

class CheckInBookController extends BaseController {
  useCase: CheckInBookUseCase;

  constructor(useCase: CheckInBookUseCase) {
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

export { CheckInBookController };
