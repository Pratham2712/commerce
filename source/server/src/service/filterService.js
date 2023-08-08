import productModel from "../Models/productModel.js";

export const getColorService = async (data) => {
  const res = await productModel.find(data).distinct("color");
  return res;
};

export const getBrandService = async (data) => {
  const res = await productModel.find(data).select("brand");
  return res;
};
