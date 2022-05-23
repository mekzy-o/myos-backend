import argon2 from "argon2";
import { UserAttributes } from "../../database/models/user";
import { createUser, findUserByEmail } from "./userDAL";
import { ApplicationError } from "../../lib";
import { AuthServices } from "../auth";
import { userValidator } from "./userValidator";

export const addNewUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: UserAttributes; token: string }> => {
  await userValidator.validate({ email, password }, { strict: true });
  const isExistingAccount = await checkExistingAccount(email);
  if (isExistingAccount) {
    throw new ApplicationError({ message: "Email already exists" });
  }
  const hashedPassword = await argon2.hash(password, { type: argon2.argon2id });
  const user = await createUser({
    email,
    password: hashedPassword,
  });
  const userId = user.dataValues.id;
  return { user, token: AuthServices.generateToken({ email, userId }) };
};

export const validateUser = async (
  email: string,
  password: string
): Promise<{ user: UserAttributes; token: string }> => {
  await userValidator.validate({ email, password }, { strict: true });
  const user = await findUserByEmail(email);
  if (!user) {
    throw new ApplicationError({
      message: "Invalid Account Credentials",
      status: 400,
    });
  }
  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    throw new ApplicationError({ message: "Invalid Account Credentials" });
  }
  return {
    user,
    token: AuthServices.generateToken({ email, userId: user.id as string }),
  };
};

export const checkExistingAccount = async (email: string): Promise<boolean> => {
  const user = await findUserByEmail(email);
  return user !== null;
};
