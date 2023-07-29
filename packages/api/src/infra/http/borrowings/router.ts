import { Router } from "express";
import { allBorrowingsController } from "./controllers";

const borrowingsRouter = Router();

borrowingsRouter.get("/", (req, res) => allBorrowingsController.execute(req, res));

export { borrowingsRouter };
