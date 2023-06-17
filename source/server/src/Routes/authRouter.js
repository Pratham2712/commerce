import { Router } from "express";
import { getPhoneController } from "../Controllers/authController.js";

const authRouter = Router();

authRouter.post("/get_phone", getPhoneController);

export { authRouter };
