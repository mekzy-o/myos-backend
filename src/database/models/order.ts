import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "../databaseTypes";

export interface OrderAttributes {
  id?: string;
  userId: string;
  cartId: string;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderInstance
  extends Sequelize.Instance<OrderAttributes>,
    OrderAttributes {
  dataValues: OrderAttributes;
}

export const OrderModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<OrderInstance, OrderAttributes> => {
  const attributes: SequelizeAttributes<OrderAttributes> = {
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    cartId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    totalAmount: {
      allowNull: false,
      type: DataTypes.DECIMAL(20, 2).UNSIGNED,
    },
  };

  const OrderModel = sequelize.define<OrderInstance, OrderAttributes>(
    "order",
    attributes
  );

  return OrderModel;
};
