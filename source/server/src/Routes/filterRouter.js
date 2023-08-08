import { Router } from "express";
import {
  getBrandController,
  getColorController,
} from "../Controllers/filterController.js";

const filterRouter = Router();

filterRouter.post("/getColor", getColorController);
filterRouter.post("/getBrand", getBrandController);

export { filterRouter };
