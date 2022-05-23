import http from "http";
import { createLogger, format, transports } from "winston";
import app from "./app";

require("dotenv").config();

const port = process.env.PORT || 8008;
const { pid } = process;

app.set("port", port);
const server = http.createServer(app);

const logger = createLogger({
  level: "debug",
  format: format.simple(),
  transports: [new transports.Console()],
});

process.on("unhandledRejection", (reason: any): void => {
  throw reason;
});

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  const message = `🚀 Server listening on ${bind} with PID ${pid}`;
  logger.debug(message);
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case "EADDRINUSE":
      logger.debug(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
};

const closeOpenConnections = () => {
  logger.debug("Shutting down server and open connections");
  server.close(() => {
    logger.debug("Server shut down");
  });
};

process.on("SIGTERM", () => {
  logger.debug("SIGTERM Signal Received");
  closeOpenConnections();
});

const startServer = () => {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
};

startServer();
