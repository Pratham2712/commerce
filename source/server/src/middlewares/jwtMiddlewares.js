import { FAILURE } from "../constants/constants.js";
import { getUser } from "../service/authService.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    if (req.cookies["USER_TOKEN"]) {
      const decryptedToken = await jwt.verify(
        req.cookies["USER_TOKEN"],
        process.env.JWT_SECRET
      );
      const user = await getUser(decryptedToken._id);
      if (user) {
        req.body._id = user._id;
        req.body.username = user.username;
        req.body.phone = user?.phone;
        req.body.email = user?.email;
        next();
      } else {
        return res.status(401).json({
          type: FAILURE,
          errors: [],
          message: "User not found",
        });
      }
    } else {
      return res.status(401).json({
        type: FAILURE,
        errors: [],
        message: "Cookie not found",
      });
    }
  } catch (error) {
    next(error, req, res, next);
  }
};
