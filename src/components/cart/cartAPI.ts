import { Router } from "express";
import { AuthServices } from "../auth";
import {
  addCartItems,
  checkoutCart,
  getUserCart,
  removeProductFromCart,
} from "./cartController";

const router: Router = Router();
const { verifyToken } = AuthServices;

router.get("/:cartId", verifyToken, getUserCart);
router.post("/", verifyToken, addCartItems);
router.delete(
  "/:cartId/products/:productId",
  verifyToken,
  removeProductFromCart
);
router.get("/:cartId/checkout", verifyToken, checkoutCart);

export default router;
