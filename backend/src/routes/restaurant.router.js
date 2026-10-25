import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getHealth,
  getRestaurants,
  getRestaurantStats,
  getSingleRestaurant,
  updateRestaurant,
  getRestaurantCuisineStats,
  getOpenCuisineStats,
  getCuisineAverageRating,
} from "../controllers/restaurant.controller.js";

const router = Router();

/**
 * @GET /api/health
 * @description Health check endpoint
 * @returns {Object} - Returns a JSON object with a message indicating the server is running.
 */

router.get("/health", getHealth);

/**
 * @GET /api/restaurants/stats
 * @description get restaurant stats
 * @returns {Object} - Returns a JSON object with the total number of restaurants and the average rating.
 */

router.get("/restaurants/stats", getRestaurantStats);

/**
 * @GET /api/restaurants/cuisine-stats
 * @description get restaurant cuisine stats
 * @returns {Object} - Returns a JSON object with the total number of restaurants for each cuisine type.
 */

router.get("/restaurants/cuisine-stats", getRestaurantCuisineStats);

/**
 * @GET /api/restaurants/open-cuisine-stats
 * @description get open restaurant cuisine stats
 * @returns {Object} - Returns a JSON object with the total number of open restaurants for each cuisine type.
 */
router.get("/restaurants/open-cuisine-stats", getOpenCuisineStats);

/**
 * @GET /api/restaurants/cuisine-average-ratings
 * @description get average ratings for each cuisine type
 * @returns {Object} - Returns a JSON object with the average rating for each cuisine type.
 */
router.get("/restaurants/cuisine-average-ratings", getCuisineAverageRating);

/**
 * @POST /api/restaurants
 * @description create restaurants
 */

router.post("/restaurants", createRestaurant);

/**
 * @GET /api/restaurants
 * @description get all restaurants
 */

router.get("/restaurants", getRestaurants);

/**
 * @GET /api/restaurants/:id
 * @description get restaurant by id
 */

router.get("/restaurants/:id", getSingleRestaurant);

/**
 * @PATCH /api/restaurants/:id
 * @description update restaurant by id
 */

router.patch("/restaurants/:id", updateRestaurant);

/**
 * @DELETE /api/restaurants/:id
 * @description delete restaurant by id
 */

router.delete("/restaurants/:id", deleteRestaurant);

export default router;
