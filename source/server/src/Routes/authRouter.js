import { Router } from "express";
import {
  loginController,
  checkUserController,
  tokenLoginController,
  signupController,
  logoutController,
} from "../Controllers/authController.js";
import { verifyToken } from "../middlewares/jwtMiddlewares.js";

const authRouter = Router();

authRouter.post("/checkUser", checkUserController);
authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);
authRouter.get("/token_login", verifyToken, tokenLoginController);
authRouter.get("/logout", verifyToken, logoutController);

export { authRouter };
