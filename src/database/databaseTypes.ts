import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import * as Sequelize from "sequelize";
import { UserAttributes, UserInstance } from "./models/user";
import { ProductAttributes, ProductInstance } from "./models/product";
import { CartAttributes, CartInstance } from "./models/cart";
import { CartItemAttributes, CartItemInstance } from "./models/cartItem";
import { OrderAttributes, OrderInstance } from "./models/order";

type SequelizeAttribute =
  | string
  | DataTypeAbstract
  | DefineAttributeColumnOptions;

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute;
};

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  User: Sequelize.Model<UserInstance, UserAttributes>;
  Product: Sequelize.Model<ProductInstance, ProductAttributes>;
  Cart: Sequelize.Model<CartInstance, CartAttributes>;
  CartItem: Sequelize.Model<CartItemInstance, CartItemAttributes>;
  Order: Sequelize.Model<OrderInstance, OrderAttributes>;
}
