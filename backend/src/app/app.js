import express from "express";
import router from "../routes/restaurant.router.js";
import reviewRouter from "../routes/review.router.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", router);
app.use("/api", reviewRouter);


export default app;

