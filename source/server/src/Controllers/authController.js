import { FAILURE, SUCCESS } from "../constants/constants.js";
import { loginService, checkUserService } from "../service/authService.js";
import jwt from "jsonwebtoken";

export const checkUserController = async (req, res, next) => {
  // res
  //   .cookie("USER_TOKEN", "1234", {
  //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  //     secure: false,
  //     sameSite: "lax",
  //     httpOnly: true,
  //     path: "/",
  //     domain: "192.168.1.12",
  //   })
  //   .status(200)
  //   .send("cookie stored");

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
  console.log("route");

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
      console.log(jwtToken);
      res.status(200).json({
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

// export const setCookie = async (req, res, next) => {
//   console.log("called setCookie");
//   try {
//     const isUser = await checkUserService(req.body.username);
//     if (isUser) {
//       const token = {
//         _id: isUser._id,
//       };
//       const jwtToken = await jwt.sign(token, process.env.JWT_SECRET);
//       console.log(jwtToken);
//       if (jwtToken) {
//         res
//           .status(200)
//           .cookie("USER_TOKEN", jwtToken, {
//             expires: new Date(Date.now() + 1000 * 60 * 1),
//             httpOnly: true,
//           })
//           .json({
//             type: SUCCESS,
//             errors: [],
//             message: "Login Successful",
//             data: { userName: isUser.username },
//           });
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };
