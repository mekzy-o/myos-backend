import { Router } from "express";
import { cartRoutes } from "./cart";
import { userRoutes } from "./user";
import { productRoutes, ProductServices } from "./product";

const routes: Router = Router();

routes.use("/products", productRoutes);
routes.use("/carts", cartRoutes);
routes.use("/users", userRoutes);
export { ProductServices };

export default routes;
