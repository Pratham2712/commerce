import categoryModel from "../Models/categoryModel.js";

export const addCategoryService = async (data) => {
  const res = await categoryModel.create(data);
  return res;
};

export const getCategoryService = async () => {
  const res = await categoryModel.find({});
  return res;
};

export const addSubService = async (data) => {
  const res = await categoryModel.findByIdAndUpdate(
    data?.subId,
    { $push: { subCategory: data?.subcategory } },
    { new: true }
  );
  return res;
};

export const deleteSubService = async ({ subId, subCategory }) => {
  const res = await categoryModel.findByIdAndUpdate(
    subId,
    { $pull: { subCategory: subCategory } },
    { new: true }
  );
  return res;
};

export const deleteCatService = async ({ catId }) => {
  const res = await categoryModel.findByIdAndDelete(catId);
  return res;
};

export const getCatbyTypeService = async ({ type }) => {
  const res = await categoryModel.find(
    { type: type },
    { category: 1, subCategory: 1 }
  );
  return res;
};
