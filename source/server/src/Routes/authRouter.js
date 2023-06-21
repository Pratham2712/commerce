import { Router } from "express";
import { loginController } from "../Controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", loginController);

export { authRouter };
