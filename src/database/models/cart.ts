import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "../databaseTypes";

export interface CartAttributes {
  id?: string;
  userId: string;
  checkedOut: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartInstance
  extends Sequelize.Instance<CartAttributes>,
  CartAttributes {
  dataValues: CartAttributes;
}

export const CartModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<CartInstance, CartAttributes> => {
  const attributes: SequelizeAttributes<CartAttributes> = {
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    checkedOut: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  };

  const Cart = sequelize.define<CartInstance, CartAttributes>(
    "cart",
    attributes
  );

  return Cart;
};
