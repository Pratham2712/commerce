import mongoose from "mongoose";

const product = new mongoose.Schema({
  product_id: mongoose.Types.ObjectId,
  count: Number,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    unique: true,
    required: true,
  },
  list: {
    type: [product],
    ref: "products",
  },
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
