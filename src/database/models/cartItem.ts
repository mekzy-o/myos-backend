import * as Sequelize from "sequelize";
import argon2 from "argon2";
import { SequelizeAttributes } from "../databaseTypes";

export interface CartItemAttributes {
  Products?: { price: string };
  id?: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartItemInstance
  extends Sequelize.Instance<CartItemAttributes>,
    CartItemAttributes {
  Products: { price: string };
  dataValues: CartItemAttributes;
}

export const CartItemModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<CartItemInstance, CartItemAttributes> => {
  const attributes: SequelizeAttributes<CartItemAttributes> = {
    cartId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    productId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  };

  const CartItem = sequelize.define<CartItemInstance, CartItemAttributes>(
    "cartItem",
    attributes
  );

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "Products",
    });
    CartItem.hasMany(models.Cart, { foreignKey: "id", as: "cart" });
  };

  return CartItem;
};
