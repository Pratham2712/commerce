import { Router } from "express";
import {
  deleteCartController,
  getCartpageController,
  getUserDetailsController,
  updateSizeController,
} from "../Controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/getcartpage", getCartpageController);
cartRouter.post("/delete", deleteCartController);
cartRouter.post("/updatesize", updateSizeController);
cartRouter.get("/getuserdetail", getUserDetailsController);

export { cartRouter };
