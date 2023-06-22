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
const pinCodeValidator = (value) => {
  let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
  if (!regex.test(value)) {
    throw new Error("pincode is not valid");
  }
};
//

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["HOME", "WORK", "OTHERS"],
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
    validate: pinCodeValidator,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      validate: phoneValidate,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      validate: emailValidate,
      unique: true,
      sparse: true,
    },
    address: {
      type: [addressSchema],
    },
    basicDetails: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "NOT SPECIFIED"],
      default: "NOT SPECIFIED",
    },
    dob: {
      type: Date,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
