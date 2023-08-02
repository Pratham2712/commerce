import { Router } from "express";
import {
  createOrderController,
  createRazorOrderController,
  updateOrderController,
  verifyPaymentController,
} from "../Controllers/orderController.js";

const orderRouter = Router();

orderRouter.post("/createOrder", createOrderController);
orderRouter.post("/updateOrder", updateOrderController);
orderRouter.post("/createRazorOrder", createRazorOrderController);
orderRouter.post("/verifyPayment", verifyPaymentController);

export { orderRouter };
