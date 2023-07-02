import { Router } from "express";
import {
  getProductController,
  getTypeCatController,
} from "../Controllers/homeController.js";

const homeRouter = Router();

homeRouter.post("/getTypeCat", getTypeCatController);
homeRouter.post("/getproduct", getProductController);

export { homeRouter };
