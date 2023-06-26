import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    unique: true,
    required: true,
  },
  list: {
    type: [mongoose.Types.ObjectId],
    ref: "products",
  },
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
