import { FAILURE, SUCCESS } from "../constants/constants.js";
import { sendOTP } from "../service/OTPservice.js";

export const getPhoneController = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phone;
    //const result = await sendOTP(phoneNumber);
    const result = true;
    if (result) {
      res.status(200).json({
        type: SUCCESS,
        message: "OTP send successfully",
        data: {
          phoneNumber: req.body.phoneNumber,
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
