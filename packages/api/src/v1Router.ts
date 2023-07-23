import express from "express";
import { booksRouter } from "./infra/http/router";

const v1Router = express.Router();

v1Router.use("/books", booksRouter);

export { v1Router };
