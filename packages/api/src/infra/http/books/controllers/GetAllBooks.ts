import { Request, Response } from "express";
import { IGetAllBooksUseCase } from "../../../../domain";
import { BooksMapper } from "../../../../mappers/Books";
import { BaseController } from "../../../../shared";
import { IBooksRepo } from "../../../../domain/repos/IBooksRepo";

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
  constructor(private useCase: IGetAllBooksUseCase, private booksRepo: IBooksRepo) {
    super();
  }

  async executeImpl(req: Request, res: Response) {
    const title = req.query.title;

    if (title && typeof title !== "string") {
      return res.status(400).send("Title must be a string");
    }

    // @ts-ignore
    // const booksOrError = await this.booksRepo.findAllEmbedded();

    const booksOrError = await this.useCase.execute({ title });

    if (booksOrError.isLeft()) {
      return this.fail(res, booksOrError.value.message);
    }

    // res.json(booksOrError.value);
    res.json(booksOrError.value.map(BooksMapper.entityToDto));
  }
}

export { GetAllBooksController };
