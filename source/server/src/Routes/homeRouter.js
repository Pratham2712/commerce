import { Router } from "express";
import {
  addtocartController,
  getAllCartController,
  getProductController,
  getProductDetailController,
  getTypeCatController,
} from "../Controllers/homeController.js";
import { verifyToken } from "../middlewares/jwtMiddlewares.js";

const homeRouter = Router();

homeRouter.post("/getTypeCat", getTypeCatController);
homeRouter.post("/getproduct", getProductController);
homeRouter.post("/getProductDetail", getProductDetailController);
homeRouter.post("/addtocart", verifyToken, addtocartController);
homeRouter.get("/getallcart", verifyToken, getAllCartController);

export { homeRouter };
