import Review from "../models/review.model.js";
import Restaurant from "../models/restaurant.model.js";

export async function createReview(req, res) {
  try {
    const { restaurantId, comment, rating } = req.body;

    // Check whether the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Create a new review
    const review = await Review.create({
      restaurantId,
      comment,
      rating,
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
}

export async function getRestaurantReviewStats(req, res) {
  try {
    const stats = await Restaurant.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "restaurantId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          averageRating: { $avg: "$reviews.rating" },
          totalReviews: {
            $sum: {
              $cond: [{ $ifNull: ["$reviews.rating", false] }, 1, 0],
            },
          },
        },
      },
      {
        $match: {
          averageRating: { $gte: 4 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$name",
          averageRating: { $round: ["$averageRating", 2] },
          totalReviews: 1,
        },
      },
      {
        $sort: {
          totalReviews: -1,
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
      message: "Error fetching restaurant review statistics",
      error: error.message,
    });
  }
}

export async function getPopularRestaurants(req, res) {
  try {
    const popularRestaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "restaurantId",
          as: "reviews",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name",
          },
          averageRating: {
            $avg: "$reviews.rating",
          },
          totalReviews: {
            $sum: {
              $cond: [
                {
                  $ifNull: ["$reviews.rating", false],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $match: {
          totalReviews: { $gt: 0 },
        },
      },
      {
        $sort: {
          totalReviews: -1,
          averageRating: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          name: "$name",
          averageRating: {
            $round: ["$averageRating", 2],
          },
          totalReviews: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      count: popularRestaurants.length,
      data: popularRestaurants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching popular restaurants",
      error: error.message,
    });
  }
}
