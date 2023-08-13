import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { WinstonLogger } from "./shared/logger";
import { v1Router } from "./v1Router";

const app = express();
const logger = new WinstonLogger();

// SETUP MIDDLEWARES
// app.use(morgan(":method :url :status"));
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);
app.use(helmet());
app.use(cors({ origin: ["http://localhost:8889"] }));
app.use(express.json());

// SETUP ROUTERS
app.use("/api", v1Router);

// SETUP ERROR HANDLING
app.use(
  (error: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(error.message);
    res.status(500).send({
      message: error.message,
      ...(process.env.NODE_ENV === "production" ? null : { stack: error.stack }),
    });
  },
);

export const startServer = (port: number | string) => {
  const server = app.listen(port, () => {
    logger.debug(`Server is running on port ${port}.`);
  });

  return server;
};
