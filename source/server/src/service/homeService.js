import cartModel from "../Models/cartModel.js";
import categoryModel from "../Models/categoryModel.js";
import productModel from "../Models/productModel.js";

export const getTypeCatService = async (data) => {
  // const res = await categoryModel.find();
  // ===================javascript logic=======================
  // const obj = {};

  // for (const val of res) {
  //   let tempname = val?.type;
  //   if (!obj[tempname]) {
  //     const catobj = {};
  //     obj[tempname] = {
  //       categories: catobj,
  //     };
  //     if (!catobj[val.category]) {
  //       catobj[val.category] = val.subCategory;
  //     }
  //     continue;
  //   }
  //   //
  //   let tempcategory = {};
  //   tempcategory[val.category] = val.subCategory;
  //   obj[tempname] = {
  //     categories: { ...obj[tempname].categories, ...tempcategory },
  //   };
  // }

  const res = await categoryModel.aggregate([
    {
      $group: {
        _id: "$type",
        categories: {
          $addToSet: {
            category: "$category",
            subCategory: "$subCategory",
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        data: {
          $push: {
            type: "$_id",
            categories: "$categories",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        data: 1,
      },
    },
  ]);

  return res;
};

export const getProductService = async (data, filter) => {
  const total = await productModel.find(filter).count();
  const pagesize = data.pagesize || 4;
  const page = data.page || 0;
  const res = await productModel
    .find(filter, { title: 1, price: 1, image: { $slice: 1 } })
    .limit(pagesize)
    .skip(pagesize * page);
  return { total: Math.ceil(total / pagesize), data: res };
};

export const getProductDetailService = async ({ product_id }) => {
  const res = await productModel.findById(product_id);
  return res;
};

export const addtocartService = async ({ userId, product_id }) => {
  const cart = await cartModel.findOne({ userId: userId });
  if (!cart) {
    const newCart = await cartModel.create({
      userId: userId,
      list: [{ product_id: product_id, count: 1 }],
    });
    return newCart;
  }

  const productIndex = cart.list.findIndex((item) =>
    item.product_id.equals(product_id)
  );

  if (productIndex === -1) {
    cart.list.push({ product_id: product_id, count: 1 });
  } else {
    cart.list[productIndex].count++;
  }
  await cart.save();

  return cart;
};

export const getAllCartService = async (data) => {
  const res = await cartModel.findOne({ userId: data?.userId }, { list: 1 });
  let total = 0;
  if (res) {
    total = res.list.reduce((sum, item) => sum + item.count, 0);
  }
  return { totalCart: total, data: res };
};
