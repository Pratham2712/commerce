import cartModel from "../Models/cartModel.js";
import categoryModel from "../Models/categoryModel.js";
import productModel from "../Models/productModel.js";
import wishlistModel from "../Models/wishlistModel.js";

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

export const getProductService = async (data, filter, price) => {
  if (price) {
    const [minPrice, maxPrice] = price.split("-").map(Number);

    const priceFilter = { price: { $gte: minPrice, $lte: maxPrice } };
    filter = { ...filter, ...priceFilter };
  }
  const total = await productModel.find(filter).count();
  const pagesize = data.pagesize || 10;
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
  const cart = await cartModel.findOneAndUpdate(
    { userId: userId },
    {
      $push: { list: { product_id: product_id, count: 1 } },
    },
    { upsert: true, new: true }
  );

  return cart;
};

export const getAllCartService = async (data) => {
  const res = await cartModel
    .findOne({ userId: data?.userId }, { list: 1 }, { _id: 1 })
    .lean();
  let total = 0;
  if (res) {
    total = res.list.reduce((sum, item) => sum + item.count, 0);
  }
  return { totalCart: total, data: res };
};

export const updateCartService = async (data) => {
  const cart = await cartModel.findOne({ userId: data?.userId });
  const productIndex = cart?.list?.findIndex((item) =>
    item.product_id.equals(data?.product_id)
  );
  if (cart && productIndex !== -1) {
    if (data?.type === "decrement") {
      const cnt = cart.list[productIndex].count;
      if (cnt === 1) {
        cart.list.splice(productIndex, 1);
      } else {
        cart.list[productIndex].count--;
      }
    } else {
      cart.list[productIndex].count++;
    }
    await cart.save();
    return cart;
  }
  return;
};

export const addWishlistService = async (data) => {
  const wish = await wishlistModel.findOne({ userId: data?.userId });
  if (wish) {
    const list = wish.list;
    if (list.get(data?.product_id)) {
      list.set(data?.product_id, 0);
    } else {
      list.set(data?.product_id, 1);
    }
    return await wish.save();
  } else {
    const newWishlist = new wishlistModel({
      userId: data?.userId,
      list: { [data?.product_id]: 1 },
    });
    return await newWishlist.save();
  }
};

export const getWishlistService = async (data) => {
  const wish = await wishlistModel.findOne({ userId: data?.userId });
  return wish;
};
