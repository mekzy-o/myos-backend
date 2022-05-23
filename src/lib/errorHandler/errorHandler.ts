import { Response, Request, NextFunction } from "express";
import * as yup from "yup";

import { ApplicationError } from "./errors";
import { errorResponse } from "../httpResponse";

const isProduction = process.env.NODE_ENV === "production";

export const errorHandler = (
  error: ApplicationError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (response.headersSent) {
    return next(error);
  }

  let message = error.message;
  let statusCode = error.status || 500;
  const data = {
    ...(error.errors && error.errors?.length > 0 && { errors: error.errors }),
    ...(!isProduction && { trace: error.stack }),
  };

  if (error instanceof yup.ValidationError) {
    statusCode = 422;
    message = error.errors[0];
  }

  return errorResponse({
    req: request,
    res: response,
    data,
    message,
    statusCode,
  });
};
