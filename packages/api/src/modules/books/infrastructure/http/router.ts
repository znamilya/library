import express from "express";

import { GetAllBooksController } from "./controllers/GetAllBooks";
import { GetAllBooksUseCase } from "../../useCases";
import { MemoryBooksRepo } from "../repos/MemoryBooksRepo";

const catalogRouter = express.Router();

const getAllBooksController = new GetAllBooksController(
  new GetAllBooksUseCase(new MemoryBooksRepo()),
);

catalogRouter.get("/", async (req, res) => getAllBooksController.execute(req, res));

export { catalogRouter };
