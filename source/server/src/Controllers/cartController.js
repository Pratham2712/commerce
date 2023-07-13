import { FAILURE, SUCCESS } from "../constants/constants.js";
import {
  deletCartService,
  getCartpageService,
  updateSizeService,
} from "../service/cartService.js";

export const getCartpageController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
    };
    const result = await getCartpageService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetch cart successfully",
        data: result[0].list,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch cart",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteCartController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      product_id: req.body?.product_id,
    };
    const result = await deletCartService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Deleted cart successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to delete cart",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const updateSizeController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      product_id: req.body?.product_id,
      size: req.body?.size,
    };
    const result = await updateSizeService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Updated size successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to update size",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
