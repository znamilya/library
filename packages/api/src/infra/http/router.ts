import express from "express";

import { checkoutBookController, getAllBooksController } from "./controllers";

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => getAllBooksController.execute(req, res));
booksRouter.post("/checkout", async (req, res) => checkoutBookController.execute(req, res));

export { booksRouter };
