import httpGracefulShutdown from "http-graceful-shutdown";

import { startServer } from "./app";

const server = startServer(process.env.PORT || 1235);

httpGracefulShutdown(server, {
  development: true,
  signals: "SIGINT SIGTERM",
  preShutdown: async () => {
    console.log("Server is stopping.");
  },
  onShutdown: async () => {
    console.log("Server stopped.");
  },
});
