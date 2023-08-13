import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    comment: { type: String, required: false },
    rating: { type: Number, required: false },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: false, unique: true },
    slug: { type: String, required: false, unique: true },
    image: { type: String, required: false },
    images: [String],
    brand: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: false },
    countInStock: { type: Number, required: false },
    rating: { type: Number, required: false },
    numReviews: { type: Number, required: false },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
