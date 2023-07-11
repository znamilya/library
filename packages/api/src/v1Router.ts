import express from "express";
import { catalogRouter } from "./modules/catalog";

const v1Router = express.Router();

v1Router.use("/catalog", catalogRouter);

export { v1Router };
