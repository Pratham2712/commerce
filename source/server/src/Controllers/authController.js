import { FAILURE, SUCCESS } from "../constants/constants.js";
import { loginService, checkUserService } from "../service/authService.js";
import jwt from "jsonwebtoken";

export const checkUserController = async (req, res, next) => {
  try {
    const result = await checkUserService(req.body.data);
    if (result.length) {
      return res.status(200).json({
        type: FAILURE,
        message: "Username is already taken",
        data: true,
      });
    } else {
      return res.status(200).json({
        type: SUCCESS,
        data: false,
        message: "",
      });
    }
  } catch (error) {}
};

export const loginController = async (req, res, next) => {
  try {
    const data = {
      username: req.body?.username,
      password: req.body?.password,
    };
    const isUser = await checkUserService(req.body.username);
    if (isUser.length) {
      return res.status(400).json({
        type: FAILURE,
        message: "User already exist",
        errors: [],
      });
    }
    const result = await loginService(data);
    if (result) {
      const token = {
        _id: result._id,
      };
      const jwtToken = await jwt.sign(token, "secret");
      return res
        .status(200)
        .cookie("USER_TOKEN", jwtToken)
        .json({
          type: SUCCESS,
          message: "Logged in sucessfully",
          data: {
            data: result,
          },
        });
    } else {
      return res.status(400).json({
        type: FAILURE,
        errors: [],
        message: "Fail to login",
      });
    }
  } catch (error) {
    next(error);
  }
};
