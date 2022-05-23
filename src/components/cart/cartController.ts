import { Request, Response, NextFunction } from "express";
import { CartItemAttributes } from "../../database/models/cartItem";
import { successResponse } from "../../lib";
import {
  addUserCartItem,
  cartCheckout,
  getUserCartItems,
  removeUserCartItem,
} from "./cartServices";

export const addCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  | Response<{
      res: Response;
      statusCode: number;
      message: string;
      data: CartItemAttributes[];
    }>
  | unknown
> => {
  try {
    const { productId }: CartItemAttributes = req.body;
    const userId = req.user as string;
    const cartItems = await addUserCartItem(productId, userId);
    return successResponse({
      res,
      statusCode: 201,
      message: "CartItem added Successfully",
      data: { cart: cartItems },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  | Response<{
      res: Response;
      statusCode: number;
      message: string;
      data: CartItemAttributes[];
    }>
  | unknown
> => {
  try {
    const { cartId } = req.params;
    const cartItems = await getUserCartItems(cartId, res);
    return successResponse({
      res,
      statusCode: 200,
      message: !cartItems.length
        ? "Cart is Empty"
        : "CartItems fetched Successfully",
      data: { cart: cartItems },
    });
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  | Response<{
      res: Response;
      statusCode: number;
      message: string;
      data: CartItemAttributes[];
    }>
  | unknown
> => {
  try {
    const { cartId, productId } = req.params;
    const userId = req.user;
    const cartItems = await removeUserCartItem(cartId, productId, userId);
    return successResponse({
      res,
      statusCode: 200,
      message: "CartItem removed Successfully",
      data: { cart: cartItems },
    });
  } catch (error) {
    next(error);
  }
};

export const checkoutCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<
  | Response<{
      res: Response;
      statusCode: number;
      message: string;
      data: { totalAMount: number; cartItems: CartItemAttributes[] };
    }>
  | unknown
> => {
  try {
    const { cartId } = req.params;
    const userId = req.user;
    const result = await cartCheckout(cartId, userId);
    return successResponse({
      res,
      statusCode: 200,
      message: "Cart Checkout is Successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
