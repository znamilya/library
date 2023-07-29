import { Request, Response } from "express";
import { IGetAllBorrowingsUseCase } from "../../../../domain";
import { BaseController } from "../../../../shared";

class AllBorrowingsController extends BaseController {
  useCase: IGetAllBorrowingsUseCase;

  constructor(useCase: IGetAllBorrowingsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const bookId = req.query.bookId;

    const borrowingsOrError = await this.useCase.execute({
      bookId: bookId ? String(bookId) : undefined,
    });

    if (borrowingsOrError.isLeft()) {
      return res.status(500).send(borrowingsOrError.value.message);
    }

    return res.json(borrowingsOrError.value);
  }
}

export { AllBorrowingsController };
