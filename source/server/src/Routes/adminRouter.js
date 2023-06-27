import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/addCategory", addCategoryController);

export { adminRouter };
