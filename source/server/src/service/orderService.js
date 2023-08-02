import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import cartModel from "../Models/cartModel.js";

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
    email: data?.email,
    cart: data?.cart,
    username: data?.username,
    isActive: false,
  });
  return order;
};

export const updateOrderService = async (id, data) => {
  const res = await orderModel.findByIdAndUpdate(id.order_id, {
    userId: data?.userId,
    amount: data?.amount,
    address: {
      address: data?.address,
      pincode: data?.pincode,
      phone: data?.phone,
    },
    email: data?.email,
    cart: data?.cart,
    username: data?.username,
  });
  return res;
};

export const getOrderService = async (data) => {
  const res = await orderModel.findById(data?._id);
  return res;
};

export const deleteCartService = async (data) => {
  const res = await cartModel.findByIdAndDelete(data.id);
  return res;
};

export const addPayOrderService = async (data) => {
  console.log("service", data);
  const res = await orderModel.findByIdAndUpdate(data.id, {
    payOrderId: data.payOrderId,
    payment_id: data.payment_id,
  });
  return res;
};
