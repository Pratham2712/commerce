import cartModel from "../Models/cartModel.js";

export const getCartpageService = async (data) => {
  const res = await cartModel
    .find({ userId: data?.userId }, { list: 1 })
    .populate("list.product_id");
  return res;
};
