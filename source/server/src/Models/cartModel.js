import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    unique: true,
    required: true,
  },
  list: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      size: String,
      count: Number,
    },
  ],
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
