import express from "express";

import {
  addBookController,
  checkInBookController,
  checkoutBookController,
  getAllBooksController,
  removeBookController,
} from "./controllers";

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => getAllBooksController.execute(req, res));
booksRouter.post("/", async (req, res) => addBookController.execute(req, res));
booksRouter.delete("/:bookId", async (req, res) => removeBookController.execute(req, res));
booksRouter.post("/checkout", async (req, res) => checkoutBookController.execute(req, res));
booksRouter.post("/checkin", async (req, res) => checkInBookController.execute(req, res));

export { booksRouter };
