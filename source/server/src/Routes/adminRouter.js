import { Router } from "express";
import {
  addCategoryController,
  getCategoryController,
  addSubController,
  deleteSubController,
  deleteCatController,
} from "../Controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/addCategory", addCategoryController);
adminRouter.get("/getCategory", getCategoryController);
adminRouter.post("/addSubcategory", addSubController);
adminRouter.post("/deleteSubcategory", deleteSubController);
adminRouter.post("/deleteCategory", deleteCatController);

export { adminRouter };
