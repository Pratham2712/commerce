import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    enum: ["MALE", "FEMALE", "KIDS", "NOT SPECIFIED"],
    default: "NOT SPECIFIED",
    required: true,
  },
  color: {
    type: String,
  },
  size: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Cannot be negative"],
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
  },
});

const productModel = mongoose.model("product", productSchema);
export default productModel;
