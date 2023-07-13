import { Router } from "express";
import {
  deleteCartController,
  getCartpageController,
  updateSizeController,
} from "../Controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/getcartpage", getCartpageController);
cartRouter.post("/delete", deleteCartController);
cartRouter.post("/updatesize", updateSizeController);

export { cartRouter };
