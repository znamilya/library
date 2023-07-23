import { Request, Response } from "express";
import { BooksMapper } from "../../../mappers/Books";
import { BaseUseCase } from "../../../shared/application/BaseUseCase";
import { BaseController } from "../../../shared";
import { GetAllBooksUseCase } from "@/useCases/GetAllBooks";

class GetAllBooksController extends BaseController {
  useCase: GetAllBooksUseCase;

  constructor(useCase: GetAllBooksUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(_req: Request, res: Response) {
    const books = await this.useCase.execute();

    if (books.isLeft()) {
      return res.status(500).send(books.value.message);
    }

    res.json(books.value.map(BooksMapper.entityToDto));
  }
}

export { GetAllBooksController };
