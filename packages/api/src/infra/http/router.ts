import express from "express";
import { booksRouter } from "./books/router";
import { borrowingsRouter } from "./borrowings/router";

const router = express.Router();

router.use("/books", booksRouter);
router.use("/borrowings", borrowingsRouter);

export { router };
