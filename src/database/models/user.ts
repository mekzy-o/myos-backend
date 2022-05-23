import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "../databaseTypes";

export interface UserAttributes {
  [x: string]: any;
  id?: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance
  extends Sequelize.Instance<UserAttributes>,
  UserAttributes {
  dataValues: UserAttributes;
}

export const UserModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>(
    "user",
    attributes
  );

  return User;
};
