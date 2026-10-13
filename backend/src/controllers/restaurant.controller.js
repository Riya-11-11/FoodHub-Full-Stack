import Restaurant from "../models/restaurant.model.js";

export async function getHealth(req, res) {
  res.json({
    success: true,
    message: "FoodHub API is running",
  });
}

export async function createRestaurant(req, res) {
  try {
    const restaurant = await Restaurant.create({
      name: req.body.name,
      description: req.body.description,
      cuisine: req.body.cuisine,
      address: req.body.address,
      rating: req.body.rating,
      isOpen: req.body.isOpen,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurant data",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error creating restaurants",
      error: error.message,
    });
  }
}

export async function getRestaurants(req, res) {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json({
      success: true,
      count: restaurants.length,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching restaurant",
      error: error.message,
    });
  }
}

export async function getSingleRestaurant(req, res) {
  try {
    const id = req.params.id;

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: " Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "A single restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while fetching a single restaurant",
      error: error.message,
    });
  }
}

export async function updateRestaurant(req, res) {
  try {
    const id = req.params.id;

    const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: " Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant data updated successfully",
      data: restaurant,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while updating restaurant data",
      error: error.message,
    });
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const id = req.params.id;

    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: " Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
      data: restaurant,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while deleting restaurant data",
      error: error.message,
    });
  }
}

