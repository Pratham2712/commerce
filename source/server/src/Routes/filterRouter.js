import { Router } from "express";
import { getColorController } from "../Controllers/filterController.js";

const filterRouter = Router();

filterRouter.post("/getColor", getColorController);

export { filterRouter };
