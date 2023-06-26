import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
export default wishlistModel;
