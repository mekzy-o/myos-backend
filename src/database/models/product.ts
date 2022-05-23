import * as Sequelize from "sequelize";
import { SequelizeAttributes } from "../databaseTypes";

export interface ProductAttributes {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  price: number;
  currency?: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInstance
  extends Sequelize.Instance<ProductAttributes>,
    ProductAttributes {
  dataValues: ProductAttributes;
}

export const ProductModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ProductInstance, ProductAttributes> => {
  const attributes: SequelizeAttributes<ProductAttributes> = {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(20, 2).UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  const Product = sequelize.define<ProductInstance, ProductAttributes>(
    "product",
    attributes
  );

  Product.associate = (models) => {
    Product.hasMany(models.CartItem, {
      foreignKey: "productId",
      as: "Products",
    });
  };

  return Product;
};
