import { FAILURE, SUCCESS } from "../constants/constants.js";
import Razorpay from "razorpay";

import {
  createOrderService,
  getOrderService,
  updateOrderService,
} from "../service/orderService.js";

export const updateOrderController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      email: req.body?.email,
      pincode: req.body?.pincode,
      address: req.body?.address,
      phone: req.body?.phone,
      amount: req.body?.amount,
      cart: req.body?.cart_id,
      username: req.body?.username,
    };
    const id = {
      order_id: req.body?.order_id,
    };
    const result = await updateOrderService(id, data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "updated details successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to update details",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const createOrderController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      email: req.body?.email,
      pincode: req.body?.pincode,
      address: req.body?.address,
      phone: req.body?.phone,
      amount: req.body?.amount,
      cart: req.body?.cart_id,
      username: req.body?.username,
    };
    const result = await createOrderService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Added details successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to add details",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const createRazorOrderController = async (req, res, next) => {
  try {
    const data = {
      _id: req.body?.order_id,
    };
    let razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const currentOrder = await getOrderService(data);
    if (!currentOrder) {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to proceed",
      });
    }
    let options = {
      amount: currentOrder.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    //order creation
    razorpayInstance.orders.create(options, function (err, order) {
      if (err) {
        req.error = err;
        next(err);
      }
      if (order) {
        return res.status(200).json({
          type: SUCCESS,
          data: {
            order: order,
            phone: currentOrder.phone,
            name: currentOrder.username,
            email: currentOrder.email,
          },
          message: "order successfully created",
        });
      } else {
        return res.status(400).json({
          type: FAILURE,
          message: "Failed to create order",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
