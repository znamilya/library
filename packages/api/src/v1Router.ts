import express from "express";
import { catalogRouter } from "./infra/http/router";

const v1Router = express.Router();

v1Router.use("/books", catalogRouter);

export { v1Router };
