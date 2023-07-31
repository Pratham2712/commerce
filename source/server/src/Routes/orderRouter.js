import { Router } from "express";
import {
  createOrderController,
  createRazorOrderController,
} from "../Controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/createOrder", createOrderController);
orderRouter.post("/createRazorOrder", createRazorOrderController);

export { orderRouter };
