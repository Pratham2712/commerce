import {
  addWishlistService,
  addtocartService,
  getAllCartService,
  getProductDetailService,
  getProductService,
  getTypeCatService,
  getWishlistService,
  updateCartService,
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

export const addtocartController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      product_id: req.body?.product_id,
    };
    const result = await addtocartService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Add to cart successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to add to cart",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCartController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
    };
    const result = await getAllCartService(data);
    if (result) {
      let cartDetail = {};
      result.data.list.forEach((item) => {
        cartDetail[item.product_id] = item.count;
      });
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetch all cart successfully",
        data: cartDetail,
        total: result.totalCart,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch all cart",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const updateCartController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      type: req.body?.type,
      product_id: req.body?.product_id,
    };
    const result = await updateCartService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Update cart successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to update cart",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const addWishlistController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
      product_id: req.body?.product_id,
    };
    const result = await addWishlistService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Update wish successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to update wish",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const getWishlistController = async (req, res, next) => {
  try {
    const data = {
      userId: req.body?._id,
    };
    const result = await getWishlistService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetch wishlist successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch wishlist",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
