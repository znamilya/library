import { Request, Response } from "express";
import { GetAllBooksUseCase } from "../../../useCases";
import { BaseController } from "../../../../shared";
import { BaseUseCase } from "@/modules/shared/application/BaseUseCase";

class GetAllBooksController extends BaseController {
  useCase: BaseUseCase;

  constructor(useCase: BaseUseCase) {
    super();

    this.useCase = useCase;
  }

  async executeImpl(_req: Request, res: Response) {
    res.json(await this.useCase.execute());
  }
}

export { GetAllBooksController };
