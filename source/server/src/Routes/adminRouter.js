import { Router } from "express";
import {
  addCategoryController,
  getCategoryController,
  addSubController,
  deleteSubController,
  deleteCatController,
  getCatbyTypeController,
  addProductController,
} from "../Controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/addCategory", addCategoryController);
adminRouter.get("/getCategory", getCategoryController);
adminRouter.post("/addSubcategory", addSubController);
adminRouter.post("/deleteSubcategory", deleteSubController);
adminRouter.post("/deleteCategory", deleteCatController);
adminRouter.post("/getcategory", getCatbyTypeController);
adminRouter.post("/addproduct", addProductController);

export { adminRouter };
