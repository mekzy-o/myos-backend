import sequelize, { Op } from "sequelize";
import db from "../../database/models";
import { CartAttributes } from "../../database/models/cart";
import {
  CartItemAttributes,
  CartItemInstance,
} from "../../database/models/cartItem";
import { OrderAttributes } from "../../database/models/order";

export const createUserCart = async (
  userId: string
): Promise<CartAttributes> => {
  return await db.Cart.create({
    userId,
    checkedOut: false,
  });
};

export const getUserCart = async (
  userId: string
): Promise<CartAttributes | null> => {
  return await db.Cart.findOne({
    where: {
      userId: userId,
    },
  });
};

export const getCartItems = async (
  cartId: string
): Promise<CartItemAttributes[]> => {
  const result = await db.CartItem.findAll({
    where: {
      cartId,
    },
    include: [{ model: db.Product, as: "Products", attributes: ["price"] }],
  });
  return result;
};

export const createCartItem = async (
  cartId: string,
  productId: string
): Promise<CartItemAttributes> => {
  return await db.CartItem.create({
    cartId: cartId,
    productId: productId,
    quantity: 1,
  });
};

export const removeCartItem = async (
  cartId: string,
  productId: string
): Promise<number> => {
  return await db.CartItem.destroy({
    where: {
      cartId: cartId,
      productId: productId,
    },
  });
};

export const updateCartItem = async (
  cartId: string,
  productId: string,
  operationType: "UPDATE" | "DELETE"
): Promise<[number, CartItemInstance[]]> => {
  const result =
    operationType === "UPDATE"
      ? await db.CartItem.update(
        {
          quantity: (sequelize.literal("quantity + 1") as unknown) as number,
        },
        {
          where: {
            cartId: cartId,
            productId: productId,
          },
          returning: true,
        }
      )
      : await db.CartItem.update(
        {
          quantity: (sequelize.literal("quantity - 1") as unknown) as number,
        },
        {
          where: {
            cartId: cartId,
            productId: productId,
          },
          returning: true,
        }
      );
  return result;
};

export const getProductCartItem = async (
  productId: string,
  cartId: string
): Promise<CartItemAttributes | null> => {
  return await db.CartItem.findOne({
    where: {
      productId,
      cartId,
    },
  });
};

export const calculateTotalPrice = async (cartId: string): Promise<number> => {
  const result = await getCartItems(cartId);
  let totalPrice = 0;
  result.forEach((item) => {
    totalPrice += parseFloat(item.Products!.price) * item.quantity;
  });
  return totalPrice;
};

export const createCartOrder = async (
  cartId: string,
  userId: string,
  totalAmount: number
): Promise<OrderAttributes> => {
  return await db.Order.create({
    userId,
    cartId,
    totalAmount,
  });
};

export const updateCartCheckOut = async (
  cartId: string,
) => {
  const result = await db.Cart.update(
    {
      checkedOut: true,
    },
    {
      where: {
        id: cartId,
      },
    }
  )
  return result
};