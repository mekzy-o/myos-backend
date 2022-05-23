import { Response } from "express";
import { CartItemAttributes } from "../../database/models/cartItem";
import {
  createCartItem,
  getCartItems,
  removeCartItem,
  updateCartItem,
  getProductCartItem,
  getUserCart,
  createUserCart,
  calculateTotalPrice,
  createCartOrder,
  updateCartCheckOut,
} from "./cartDAL";
import { ProductServices } from "../index";
import { ApplicationError } from "../../lib";
import { OrderAttributes } from "../../database/models/order";
import { addCartValidator } from "./cartValidator";

export const addUserCartItem = async (
  productId: string,
  userId: string
): Promise<CartItemAttributes[]> => {
  await addCartValidator.validate({ productId }, { strict: true });
  const getProduct = await ProductServices.getProductById(productId);

  if (!getProduct) {
    throw new ApplicationError({ message: "Product not found" });
  }

  if (!getProduct?.quantity) {
    throw new ApplicationError({ message: "Product is out of stock" });
  }

  const userCart = await getUserCart(userId);

  //check if user cart is empty
  if (!userCart?.id) {

    const creatNewcart = await createUserCart(userId);
    if (creatNewcart.id) {
      const newCartItem = await createCartItem(creatNewcart.id, productId);
      await ProductServices.updateProductQuantity(productId, "SUB");
      return [newCartItem];
    }

  }

  //check if product is already in cart
  const getCartItem = await getCartItemByProductId(
    productId,
    userCart?.id as string
  );

  if (getCartItem?.id) {
    await updateUserCartItem(getCartItem.cartId, productId, "UPDATE");
  } else {
    await createCartItem(userCart?.id as string, productId);
  }

  // update product quantity
  await ProductServices.updateProductQuantity(productId, "SUB");
  return await getUserCartItems(userCart?.id as string);
};

export const getUserCartItems = async (
  cartId: string,
  res?: Response
): Promise<CartItemAttributes[]> => {
  const result = await getCartItems(cartId);
  if (!result) {
    throw new ApplicationError({ message: "Cart is empty" });
  }
  return result;
};

export const removeUserCartItem = async (
  cartId: string,
  productId: string,
  userId?: string
): Promise<CartItemAttributes[]> => {
  const getCartItem = await getCartItemByProductId(productId, cartId);
  if (getCartItem!.quantity > 1) {
    await updateUserCartItem(getCartItem!.cartId, productId, "DELETE");
  } else {
    await removeCartItem(cartId, productId);
  }
  await ProductServices.updateProductQuantity(productId, "ADD");
  return await getUserCartItems(cartId);
};

export const updateUserCartItem = async (
  cartId: string,
  productId: string,
  operationType: "UPDATE" | "DELETE"
): Promise<any> => {
  const [, result] = await updateCartItem(cartId, productId, operationType);
  return result;
};

export const getCartItemByProductId = async (
  productId: string,
  cartId: string
): Promise<CartItemAttributes | null> => {
  const result = await getProductCartItem(productId, cartId);
  return result;
};

export const cartCheckout = async (
  cartId: string,
  userId: string
): Promise<OrderAttributes> => {
  const userCart = await getUserCart(userId);
  if (!userCart?.id) {
    throw new ApplicationError({ message: "You don't have a Cart yet" });
  }
  if (userCart?.checkedOut) {
    throw new ApplicationError({ message: "You have already checked out this Cart" });
  }
  const totalPrice = await calculateTotalPrice(cartId);
  const createOrder = await createCartOrder(cartId, userId, totalPrice);
  if (createOrder) {
    await updateCartCheckOut(cartId);
  }
  return createOrder;
};
