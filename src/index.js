import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./config/db.js";
import accRoutes from "./routes/accRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bnbRoutes from "./routes/bnbRoutes.js";
import countryRoutes from "./routes/countryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import food_drinkRoutes from "./routes/food_drinkRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import motelRoutes from "./routes/motelRoutes.js";
import nightlifeRoutes from "./routes/nightlifeRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import shoppingRoutes from "./routes/shoppingRoutes.js";
import stateRoutes from "./routes/stateRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", countryRoutes);
app.use("/api", regionRoutes);
app.use("/api", stateRoutes);
app.use("/api", userRoutes);
app.use("/api", accRoutes);
app.use("/api", hotelRoutes);
app.use("/api", motelRoutes);
app.use("/api", bnbRoutes);
app.use("/api", eventRoutes);
app.use("/api", tourRoutes);
app.use("/api", nightlifeRoutes);
app.use("/api", shoppingRoutes);
app.use("/api", food_drinkRoutes);
app.use("/api", adminRoutes);

// Error handling Middleware
app.use(errorHandling);

//TESTING POSTGRES Connection
app.get("/", async (req, res) => {
  console.log("START TEST");
  const result = await pool.query("SELECT current_database()");
  console.log("END TEST");
  res.send(`The database is now ${result.rows[0].current_database}`);
});

//Server Running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
