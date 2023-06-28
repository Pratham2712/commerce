import { Router } from "express";
import {
  addCategoryController,
  getCategoryController,
} from "../Controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/addCategory", addCategoryController);
adminRouter.get("/getCategory", getCategoryController);

export { adminRouter };
