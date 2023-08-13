import { Logger, createLogger, format, transports } from "winston";
import { ILogger } from "./types";

class WinstonLogger implements ILogger {
  logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: "error",
      transports: [],
    });

    if (process.env.NODE_ENV === "production") {
      this.logger.add(
        new transports.Console({
          format: format.combine(format.timestamp(), format.json()),
        }),
      );
    } else {
      this.logger.add(
        new transports.Console({
          level: "debug",
          format: format.simple(),
        }),
      );
    }
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  fatal(message: string): void {
    this.logger.emerg(message);
  }
}

export { WinstonLogger };
