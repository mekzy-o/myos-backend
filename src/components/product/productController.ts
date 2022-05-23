import { Request, Response, NextFunction } from "express";
import { ProductAttributes } from "../../database/models/product";
import { successResponse } from "../../lib";
import { getProductList, searchProducts } from "./productService";
import { QueryTypes } from "./productTypes";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  | Response<{
      res: Response;
      statusCode: number;
      message: string;
      data: ProductAttributes[];
    }>
  | unknown
> => {
  try {
    const { title, description } = (req.query as unknown) as QueryTypes;
    if (title || description) {
      const products = await searchProducts({ title, description });
      return successResponse({
        res,
        statusCode: 200,
        message: "Products fetched successfully",
        data: products,
      });
    }
    const products = await getProductList();
    return successResponse({
      res,
      statusCode: 200,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
