import express from "express";

const catalogRouter = express.Router();

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

catalogRouter.get("/", async (req, res) => {
  await wait(2000);

  res.json([]);
});

export { catalogRouter };
