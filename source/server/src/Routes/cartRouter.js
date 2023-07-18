import { Router } from "express";
import {
  addDelDetailsController,
  deleteCartController,
  getCartpageController,
  getUserDetailsController,
  updateSizeController,
} from "../Controllers/cartController.js";

const cartRouter = Router();

cartRouter.get("/getcartpage", getCartpageController);
cartRouter.post("/delete", deleteCartController);
cartRouter.post("/updatesize", updateSizeController);
cartRouter.post("/addDelDetails", addDelDetailsController);
cartRouter.get("/getuserdetail", getUserDetailsController);

export { cartRouter };
