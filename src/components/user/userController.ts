import { Request, Response, NextFunction } from "express";
import { UserAttributes } from "../../database/models/user";
import { successResponse } from "../../lib";
import { addNewUser, validateUser } from "./userService";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  | Response<{
      res: Response;
      statusCode: number;
      message: string;
      data: UserAttributes;
    }>
  | unknown
> => {
  try {
    const { email, password } = req.body;
    const user = await addNewUser({ email, password });
    return successResponse({
      res,
      statusCode: 200,
      message: "User account created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  Promise<
    | Response<{
        res: Response;
        statusCode: number;
        message: string;
        data: UserAttributes;
      }>
    | unknown
  >
> => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    return successResponse({
      res,
      statusCode: 200,
      message: "User login successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
