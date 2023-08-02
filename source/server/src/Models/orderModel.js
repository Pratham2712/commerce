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
  },
  pincode: {
    type: String,
    validate: pinCodeValidator,
  },
  phone: {
    type: String,
    validate: phoneValidate,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: true,
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
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    paymentInitiated: {
      type: Boolean,
      default: false,
    },
    payOrderId: {
      type: String,
    },
    payment_id: {
      type: String,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
