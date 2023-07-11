import { FAILURE, SUCCESS } from "../constants/constants.js";
import { getCartpageService } from "../service/cartService.js";

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
