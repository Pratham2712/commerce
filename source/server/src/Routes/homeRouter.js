import { Router } from "express";
import { getTypeCatController } from "../Controllers/homeController.js";

const homeRouter = Router();

homeRouter.post("/getTypeCat", getTypeCatController);

export { homeRouter };
