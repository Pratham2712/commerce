import {
  getProductDetailService,
  getProductService,
  getTypeCatService,
} from "../service/homeService.js";
import { FAILURE, SUCCESS } from "../constants/constants.js";

export const getTypeCatController = async (req, res, next) => {
  try {
    const result = await getTypeCatService({ type: req.body?.type });
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetched successfully",
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
export const getProductDetailController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getProductDetailService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetched successfully",
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
export const getProductController = async (req, res, next) => {
  try {
    const data = req.body;
    const filter = {};
    const pagination = {};
    if (data?.type) {
      filter.type = data.type;
    }
    if (data?.sub) {
      filter.subCategory = data.sub;
    }
    if (data?.page) {
      pagination.page = data.page;
    }
    if (data?.pagesize) {
      pagination.pagesize = data.pagesize;
    }
    const result = await getProductService(pagination, filter);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetched successfully",
        data: result?.data,
        total: result?.total,
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
