import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;