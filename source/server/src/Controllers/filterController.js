import { FAILURE, SUCCESS } from "../constants/constants.js";
import { getBrandService, getColorService } from "../service/filterService.js";

export const getColorController = async (req, res, next) => {
  try {
    const result = await getColorService({
      type: req.body?.type,
      subCategory: req.body?.subCategory,
    });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetched successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getBrandController = async (req, res, next) => {
  try {
    const result = await getBrandService({
      type: req.body?.type,
      subCategory: req.body?.subCategory,
    });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetched successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
