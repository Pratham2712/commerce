import { Router } from "express";
import { getCartpageController } from "../Controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/getcartpage", getCartpageController);

export { cartRouter };
