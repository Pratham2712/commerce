import categoryModel from "../Models/categoryModel.js";
import productModel from "../Models/productModel.js";

export const getTypeCatService = async (data) => {
  const res = await categoryModel.find({ type: data?.type });
  return res;
};

export const getProductService = async (data) => {
  const res = await productModel.find({});
  return res;
};
