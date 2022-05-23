import Sequelize from "sequelize";
import { DbInterface } from "../databaseTypes";
import { UserModel } from "./user";
import { ProductModel } from "./product";
import { CartModel } from "./cart";
import { CartItemModel } from "./cartItem";
import { OrderModel } from "./order";
const env = process.env.NODE_ENV || "development";
const config = require("../config")[env];

const url = config.url || process.env.DATABSE_URL;

const sequelize = new Sequelize(url, { ...config });

const db: DbInterface = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, Sequelize),
  Product: ProductModel(sequelize, Sequelize),
  Cart: CartModel(sequelize, Sequelize),
  CartItem: CartItemModel(sequelize, Sequelize),
  Order: OrderModel(sequelize, Sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
