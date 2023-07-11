import { FAILURE, SUCCESS } from "../constants/constants.js";
import {
  loginService,
  checkUserService,
  getUser,
} from "../service/authService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      const jwtToken = await jwt.sign(token, process.env.JWT_SECRET);
      return res
        .status(200)
        .cookie("USER_TOKEN", jwtToken, {
          expires: new Date(Date.now() + 1000 * 60 * 60),
        })
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

export const tokenLoginController = async (req, res, next) => {
  try {
    const user = await getUser(req.body?._id);
    if (user) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Login successfull",
        errors: [],
        data: user,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to login",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const signupController = async (req, res, next) => {
  try {
    const user = await checkUserService(req.body?.username);
    if (user.length < 1) {
      return res.status(400).json({
        type: FAILURE,
        message: "incorrect username and password",
      });
    } else {
      const storedPassword = user[0].password;
      const match = await bcrypt.compare(req.body?.password, storedPassword);
      if (match) {
        const token = {
          _id: user[0]._id,
        };
        const jwtToken = await jwt.sign(token, "secret");
        return res
          .status(200)
          .cookie("USER_TOKEN", jwtToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60),
          })
          .json({
            type: SUCCESS,
            message: "Login successful",
            errors: [],
            data: user,
          });
      } else {
        return res.status(400).json({
          type: FAILURE,
          message: "incorrect username and password",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  return res.status(200).cookie("USER_TOKEN", "").json({
    type: SUCCESS,
    message: "Logout successfully",
  });
};
