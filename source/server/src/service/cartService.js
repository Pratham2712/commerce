import cartModel from "../Models/cartModel.js";

// export const getCartpageService = async (data) => {
//   let total = 0;
//   const res = await cartModel
//     .find({ userId: data?.userId }, { list: 1 })
//     .populate("list.product_id");

//   for (const v of res) {
//     for (const i of v.list) {
//       total += i?.product_id?.price * i?.count;
//     }

//   console.log(total);
//   return res;
// };

export const getCartpageService = async (data) => {
  const pipeline = [
    {
      $match: { userId: data?.userId },
    },
    {
      $project: { list: 1 },
    },
    {
      $unwind: "$list",
    },
    {
      $lookup: {
        from: "products",
        localField: "list.product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: {
            $multiply: ["$product.price", "$list.count"],
          },
        },
        list: {
          $push: "$list",
        },
      },
    },
    {
      $project: {
        _id: 0,
        total: 1,
        list: 1,
      },
    },
  ];
  const result = await cartModel.aggregate(pipeline).exec();
  const total = result.length > 0 ? result[0].total : 0;
  console.log({ total: total, result: result });
  return { total: total, result: result };
};

export const deletCartService = async (data) => {
  const cart = await cartModel.findOneAndUpdate(
    { userId: data?.userId },
    { $pull: { list: { product_id: data?.product_id } } },
    { new: true }
  );
  return cart;
};

export const updateSizeService = async (data) => {
  const updatedCart = await cartModel.findOneAndUpdate(
    {
      userId: data.userId,
      "list.product_id": data?.product_id,
    },
    {
      $set: {
        "list.$.size": data?.size,
      },
    },
    {
      new: true,
    }
  );

  return updatedCart;
};