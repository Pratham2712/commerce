import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";

export const createOrderService = async (data) => {
  const res = await userModel.findOneAndUpdate({ _id: data?.userId }, data);
  const order = await orderModel.create({
    userId: data?.userId,
    amount: data?.amount,
    address: {
      address: data?.address,
      pincode: data?.pincode,
      phone: data?.phone,
    },
    pincode: data?.pincode,
    phone: data?.phone,
    email: data?.email,
    cart: data?.cart,
    isActive: false,
  });
  return order;
};

export const getOrderService = async (data) => {
  const res = await orderModel.findById(data?._id);
  return res;
};
