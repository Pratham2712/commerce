import mongoose from "mongoose";
import validator from "validator";

const phoneValidate = (value) => {
  if (!validator.isMobilePhone(value, "en-IN")) {
    throw new Error("phone no is not valid");
  }
};

const pinCodeValidator = (value) => {
  let regex = new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/);
  if (!regex.test(value)) {
    throw new Error("phone no is not valid");
  }
};
const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    validate: pinCodeValidator,
    required: true,
  },
  phone: {
    type: String,
    validate: phoneValidate,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isActive: {
      type: Boolean,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: AddressSchema,
    },
    email: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "cart",
      required: true,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
