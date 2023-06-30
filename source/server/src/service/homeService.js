import categoryModel from "../Models/categoryModel.js";

export const getTypeCatService = async (data) => {
  const res = await categoryModel.find({ type: data?.type });
  return res;
};
