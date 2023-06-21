import { FAILURE, SUCCESS } from "../constants/constants.js";
import { sendOTP } from "../service/OTPservice.js";

export const loginController = async (req, res, next) => {
  try {
    const data = {
      email: req.body?.email,
      password: req.body?.password,
    };
    const result = await loginService(data);
    //const result = true;
    if (result) {
      res.status(200).json({
        type: SUCCESS,
        message: "OTP send successfully",
        data: {
          data: result,
        },
      });
    } else {
      res.status(200).json({
        type: FAILURE,
        errors: [],
        message: "Could not send OTP",
      });
    }
  } catch (error) {
    next(error);
  }
};
