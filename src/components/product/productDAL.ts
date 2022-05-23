import sequelize, { Op } from "sequelize";
import db from "../../database/models";
import {
  ProductAttributes,
  ProductInstance,
} from "../../database/models/product";

export const getProducts = async (): Promise<ProductAttributes[]> => {
  return await db.Product.findAll();
};

export const getProductsById = async (
  productId: string
): Promise<ProductAttributes | null> => {
  const result = await db.Product.findOne({
    where: {
      id: productId,
    },
  });
  return result;
};

//search products by title and description
export const searchProductsByTitleAndDescription = async (
  titleQuery: string,
  descriptionQuery: string
): Promise<ProductAttributes[]> => {
  const title = titleQuery ? { title: { [Op.iLike]: `%${titleQuery}%` } } : {};
  const description = descriptionQuery
    ? { description: { [Op.iLike]: `%${descriptionQuery}%` } }
    : {};
  const where = { ...title, ...description };
  return await db.Product.findAll({ where });
};

export const updateProductByQuantity = async (
  productId: string,
  operationType: "ADD" | "SUB",
  quantity?: number
): Promise<[number, ProductInstance[]]> => {
  const result =
    operationType === "ADD"
      ? await db.Product.update(
          {
            quantity: (sequelize.literal(
              `quantity - ${quantity ? quantity : 1}`
            ) as unknown) as number,
          },
          {
            where: {
              id: productId,
            },
          }
        )
      : await db.Product.update(
          {
            quantity: (sequelize.literal("quantity - 1") as unknown) as number,
          },
          {
            where: {
              id: productId,
            },
          }
        );
  return result;
};
