import { Router } from "express";
import express from "express";
import cookieParser from "cookie-parser";
import {
  addWishlistController,
  addtocartController,
  getAllCartController,
  getProductController,
  getProductDetailController,
  getResultController,
  getTypeCatController,
  getWishlistController,
  updateCartController,
} from "../Controllers/homeController.js";
import { verifyToken } from "../middlewares/jwtMiddlewares.js";

const app = express();
app.use(cookieParser());

const homeRouter = Router();

homeRouter.post("/getTypeCat", getTypeCatController);
homeRouter.post("/getproduct", getProductController);
homeRouter.post("/getProductDetail", getProductDetailController);
homeRouter.post("/addtocart", verifyToken, addtocartController);
homeRouter.post("/updatecart", verifyToken, updateCartController);
homeRouter.get("/getallcart", verifyToken, getAllCartController);
homeRouter.get("/getWishlist", verifyToken, getWishlistController);
homeRouter.post("/addwishlist", verifyToken, addWishlistController);
homeRouter.post("/getResult", getResultController);

export { homeRouter };
