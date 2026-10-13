import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cuisine: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

export default Restaurant;
