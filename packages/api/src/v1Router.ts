import express from "express";
import { router } from "./infra/http/router";

const v1Router = express.Router();

v1Router.use("/v1", router);

export { v1Router };
