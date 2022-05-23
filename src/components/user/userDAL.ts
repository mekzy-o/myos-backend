import db from "../../database/models";
import { UserAttributes } from "../../database/models/user";

export const findUserByEmail = async (
  email: string
): Promise<UserAttributes | null> => {
  const user = await db.User.findOne({ where: { email } });
  return user;
};

export const createUser = async (
  data: UserAttributes
): Promise<UserAttributes> => {
  const user = await db.User.create(data);
  return user;
};
