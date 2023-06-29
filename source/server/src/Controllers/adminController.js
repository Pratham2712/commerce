import { FAILURE, SUCCESS } from "../constants/constants.js";
import {
  addCategoryService,
  addSubService,
  deleteCatService,
  deleteSubService,
  getCategoryService,
} from "../service/adminService.js";

export const addCategoryController = async (req, res, next) => {
  try {
    const result = await addCategoryService({
      category: req.body.category,
      type: req.body.type,
    });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Category created successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to create category",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getCategoryController = async (req, res, next) => {
  try {
    const result = await getCategoryService();
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetch successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addSubController = async (req, res, next) => {
  try {
    const result = await addSubService({
      subId: req.body?.subId,
      subcategory: req.body?.subcategory,
    });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Added subcategory sucessfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to add",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteSubController = async (req, res, next) => {
  try {
    const result = await deleteSubService({
      subId: req.body.subId,
      subCategory: req.body.subCategory,
    });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Delete sucessfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to delete",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteCatController = async (req, res, next) => {
  try {
    const result = await deleteCatService({
      catId: req.body.catId,
    });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Delete sucessfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to delete",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
