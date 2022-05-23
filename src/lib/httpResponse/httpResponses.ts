import { Request, Response } from "express";

export enum applicationMessages {
  SUCCESS_RESPONSE_MESSAGE = "The request was successful",
  ERROR_RESPONSE_MESSAGE = "Request failed",
  EXCEPTION_RESPONSE_MESSAGE = "Unexpected application error",
  HEALTH_CHECK_MESSAGE = "Health check",
}

type successResponseInputType = {
  res: Response;
  data?: any;
  status?: string;
  message?: string;
  statusCode?: number;
};

type errorResponseInputType = {
  res: Response;
  data?: any;
  status?: string;
  message?: string;
  statusCode?: number;
};

export const successResponse = ({
  res,
  data,
  message,
  status,
  statusCode,
}: successResponseInputType) => {
  const responseBody = {
    status: status || "success",
    message: message || applicationMessages.SUCCESS_RESPONSE_MESSAGE,
    data: data || {},
  };
  return res.status(statusCode || 200).send(responseBody);
};

export const errorResponse = ({
  res,
  message,
  statusCode,
}: errorResponseInputType | any) => {
  const responseBody = {
    status: "failed",
    message,
    data: null,
  };
  return res.status(statusCode || 400).send(responseBody);
};
