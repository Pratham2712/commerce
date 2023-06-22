import { Router } from "express";
import {
  loginController,
  checkUserController,
} from "../Controllers/authController.js";

const authRouter = Router();

authRouter.post("/checkUser", checkUserController);
authRouter.post("/login", loginController);

export { authRouter };
