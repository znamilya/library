import { Request, Response } from "express";
import { IGetAllBooksUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BaseController } from "../../../../shared";

type BorrowingDto = {
  id: string;
  memberId: string;
};

export type BookDto = {
  id: string;
  title: string;
  isbn: string;
  author: string;
  borrowings: BorrowingDto[];
};

class GetAllBooksController extends BaseController {
  useCase: IGetAllBooksUseCase;

  constructor(useCase: IGetAllBooksUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    const title = req.query.title;

    if (title && typeof title !== "string") {
      return res.status(400).send("Title must be a string");
    }

    const books = await this.useCase.execute({ title });

    if (books.isLeft()) {
      return res.status(500).send(books.value.message);
    }

    res.json(books.value.map(BooksMapper.entityToDto));
  }
}

export { GetAllBooksController };
