import mongoose from "mongoose";
import validator from "validator";

// email validator frrom validator.js
const emailValidate = (value) => {
  if (!validator.isEmail(value)) {
    throw new Error("Email is invalid");
  }
};
const phoneValidate = (value) => {
  if (!validator.isMobilePhone(value, "en-IN")) {
    throw new Error("Phone number is invalid");
  }
};
//
