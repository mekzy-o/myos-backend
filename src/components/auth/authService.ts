import { config } from "dotenv";
import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApplicationError } from "../../lib";

config();

const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRY_TIME = process.env.EXPIRY_TIME;

export interface AuthenticatedRequest extends Request {
  user: string;
}

export const generateToken = (payload: { email: string; userId: string }) => {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: EXPIRY_TIME,
  });
};

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization } = (req.headers as unknown) as Express.Request & {
      authorization: string;
    };

    if (!authorization) {
      throw new ApplicationError({ message: "Unauthorized request" });
    }

    if (authorization.split(" ")[0] !== "Bearer") {
      throw new ApplicationError({
        message: "Unauthorized request",
        status: 401,
      });
    }

    const [, token] = authorization.split(" ");

    const decodedToken: JwtPayload = jwt.verify(
      token,
      JWT_SECRET as string
    ) as JwtPayload;

    if (!(decodedToken.email && decodedToken.userId)) {
      throw new ApplicationError({
        message: "Unauthorized request",
        status: 401,
      });
    }

    req.user = decodedToken.userId as string;

    return next();
  } catch (error) {
    next(error);
  }
};
