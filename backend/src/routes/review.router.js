import express from "express";
import { createReview,getRestaurantReviewStats, getPopularRestaurants } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/reviews", createReview);
router.get("/reviews/stats", getRestaurantReviewStats);
router.get("/reviews/popular", getPopularRestaurants);

export default router;