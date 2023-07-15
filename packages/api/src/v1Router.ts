import express from "express";
import { catalogRouter } from "./modules/books";

const v1Router = express.Router();

v1Router.use("/books", catalogRouter);

export { v1Router };
