import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getHealth,
  getRestaurants,
  getSingleRestaurant,
  updateRestaurant,
} from "../controllers/restaurant.controller.js";

const router = Router();

/**
 * @GET /api/health
 * @description Health check endpoint
 * @returns {Object} - Returns a JSON object with a message indicating the server is running.
 */

router.get("/health", getHealth);

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
