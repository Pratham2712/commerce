import { createOrderService } from "../service/orderService.js";

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
