import { Router } from "express";
import { getProducts } from "./productController";

const router: Router = Router();

router.get("/", getProducts);

export default router;
