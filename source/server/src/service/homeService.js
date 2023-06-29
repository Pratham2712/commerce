import categoryModel from "../Models/categoryModel";

export const getTypeCatService = async (data) => {
  const res = await categoryModel.find({ type: data?.type });
};
