import {
  getProducts,
  getProductsById,
  updateProductByQuantity,
  searchProductsByTitleAndDescription,
} from "./productDAL";
import { ProductAttributes } from "../../database/models/product";

export const getProductList = async (): Promise<ProductAttributes[]> => {
  return await getProducts();
};

export const searchProducts = async (payload: {
  title: string;
  description: string;
}): Promise<ProductAttributes[]> => {
  return await searchProductsByTitleAndDescription(
    payload.title,
    payload.description
  );
};
export const getProductById = async (
  productId: string
): Promise<ProductAttributes | null> => {
  const result = await getProductsById(productId);
  return result;
};

export const updateProductQuantity = async (
  productId: string,
  operationType: "ADD" | "SUB",
  quantity?: number
): Promise<[number, ProductAttributes[]]> => {
  return await updateProductByQuantity(productId, operationType, quantity);
};
