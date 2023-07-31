import { Router } from "express";
import { createOrderController } from "../Controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/createOrder", createOrderController);

export { orderRouter };
