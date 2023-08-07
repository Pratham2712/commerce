import productModel from "../Models/productModel.js";

export const getColorService = async (data) => {
  const res = await productModel.find(data).select("color");
  return res;
};
