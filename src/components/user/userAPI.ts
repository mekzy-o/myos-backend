import { Router } from "express";
import { registerUser, loginUser } from "./userController";

const router: Router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
