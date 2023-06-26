import { Router } from "express";
import {
  loginController,
  checkUserController,
  tokenLoginController,
  signupController,
} from "../Controllers/authController.js";
import { verifyToken } from "../middlewares/jwtMiddlewares.js";

const authRouter = Router();

authRouter.post("/checkUser", checkUserController);
authRouter.post("/login", loginController);
authRouter.get("/token_login", verifyToken, tokenLoginController);
authRouter.post("/signup", signupController);

export { authRouter };
