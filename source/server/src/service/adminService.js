import categoryModel from "../Models/categoryModel.js";

export const addCategoryService = async (data) => {
  const res = await categoryModel.create(data);
  return res;
};

export const getCategoryService = async () => {
  const res = await categoryModel.find({});
  return res;
};
