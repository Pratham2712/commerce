import { Router } from "express";
import {
  getProductController,
  getProductDetailController,
  getTypeCatController,
} from "../Controllers/homeController.js";

const homeRouter = Router();

homeRouter.post("/getTypeCat", getTypeCatController);
homeRouter.post("/getproduct", getProductController);
homeRouter.post("/getProductDetail", getProductDetailController);

export { homeRouter };
