import { getTypeCatService } from "../service/homeService.js";
import { FAILURE, SUCCESS } from "../constants/constants.js";

export const getTypeCatController = async (req, res, next) => {
  try {
    const result = await getTypeCatService({ type: req.body?.type });
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
