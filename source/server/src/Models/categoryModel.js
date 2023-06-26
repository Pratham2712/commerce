import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "KIDS", "NOT SPECIFIED"],
    default: "NOT SPECIFIED",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: [String],
  },
});

const categoryModel = mongoose.model("category", categorySchema);
export default categoryModel;
