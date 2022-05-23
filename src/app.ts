import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { ApplicationError, errorHandler } from "./lib";
import routes from "./components";
require("express-async-errors");

const app = express();

const corsOptions = {
  credentials: true,
  origin: [],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// configure port and listen for requests
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get("/", (req, res) => res.status(301).redirect("/api/v1"));
app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the API' }));
app.use("/api/v1", routes);
app.all("*", (req: Request, res: Response) => {
  throw new ApplicationError({
    status: 404,
    message: `Can't find route [ ${req.originalUrl} ] on this server`,
  });
});
app.use(errorHandler);

export default app;
