import { ILogger } from "./types";

class MockLogger implements ILogger {
  debug = jest.fn();
  info = jest.fn();
  warn = jest.fn();
  error = jest.fn();
  fatal = jest.fn();
}

export { MockLogger };
