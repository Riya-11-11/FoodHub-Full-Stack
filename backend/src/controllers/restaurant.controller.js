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
    // 1. URL se query parameters read karna
    const search = req.query.search;
    const cuisine = req.query.cuisine;
    const sort = req.query.sort;

    // 2. Pagination: page validation
    const pageQuery = req.query.page;
    let page;

    if (pageQuery === undefined) {
      page = 1;
    } else {
      page = Number(pageQuery);

      if (!Number.isInteger(page) || page < 1) {
        return res.status(400).json({
          success: false,
          message: "Page must be a positive integer",
        });
      }
    }

    // 3. Pagination: limit validation
    const limitQuery = req.query.limit;
    let limit;

    if (limitQuery === undefined) {
      limit = 10;
    } else {
      limit = Number(limitQuery);

      if (!Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({
          success: false,
          message: "Limit must be a positive integer",
        });
      }
    }

    // 4. Calculate skip
    const skip = (page - 1) * limit;

    // 5. Filter object create karna
    const filter = {};

    // Name ke according search
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    // Cuisine ke according filter
    if (cuisine) {
      filter.cuisine = cuisine;
    }

    // 6. Total matching restaurants count karna
    const totalRestaurants = await Restaurant.countDocuments(filter);
    const totalPages = Math.ceil(totalRestaurants / limit);

    if (page > totalPages && totalPages !== 0) {
      return res.status(404).json({
        success: false,
        message: "Requested page does not exist",
      });
    }

    // 7. Next aur previous page check karna
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // 8. Database query create karna
    let query = Restaurant.find(filter).skip(skip).limit(limit);

    // 9. Sorting apply karna
    if (sort === "rating") {
      query = query.sort({ rating: -1, _id: 1 });
    } else if (sort === "low") {
      query = query.sort({ rating: 1, _id: 1 });
    } else if (sort === "name") {
      query = query.sort({ name: 1, _id: 1 });
    }

    // 10. Database se restaurants fetch karna
    const restaurants = await query;

    // 11. Response send karna
    return res.status(200).json({
      success: true,
      count: restaurants.length,
      message: "Restaurants fetched successfully",
      data: restaurants,
      pagination: {
        page,
        limit,
        totalRestaurants,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);

    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching restaurants",
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

export async function getRestaurantStats(req, res) {
  try {
    const stats = await Restaurant.aggregate([
      {
        $group: {
          _id: null,
          totalRestaurants: { $sum: 1 },
          averageRating: { $avg: "$rating" },
          highestRating: { $max: "$rating" },
          lowestRating: { $min: "$rating" },
        },
      },

      {
        $project: {
          _id: 0,
          totalRestaurants: 1,
          averageRating: { $round: ["$averageRating", 2] },
          highestRating: 1,
          lowestRating: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalRestaurants: 0,
        averageRating: 0,
        highestRating: 0,
        lowestRating: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getRestaurantCuisineStats(req, res) {
  try {
    const stats = await Restaurant.aggregate([
      {
        $group: {
          _id: "$cuisine",
          totalRestaurants: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalRestaurants: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: stats.length,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cuisine statistics",
      error: error.message,
    });
  }
}

export async function getOpenCuisineStats(req, res) {
  try {
    const stats = await Restaurant.aggregate([
      [
        {
          $match: {
            isOpen: true,
          },
        },
        {
          $group: {
            _id: "$cuisine",
            totalRestaurant: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalRestaurant: -1,
          },
        },
      ],
    ]);

    return res.status(200).json({
      success: true,
      count: stats.length,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching open cuisine statistics",
      error: error.message,
    });
  }
}

export async function getCuisineAverageRating(req, res) {
  try {
    const stats = await Restaurant.aggregate([
      {
        $match: {
          rating: {
            $gte: 4,
          },
        },
      },
      {
        $group: {
          _id: "$cuisine",
          averageRating: {
            $avg: "$rating",
          },
        },
      },
      {
        $sort: {
          averageRating: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: stats.length,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cuisine average ratings",
      error: error.message,
    });
  }
}
