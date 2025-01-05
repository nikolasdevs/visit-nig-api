import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import accRoutes from "./routes/accRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";

import errorHandling from "./middlewares/errorHandler.js";
// import createUserTable from "./data/createUserTable.js";
// import createAccTable from "./data/createAccTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRoutes);
app.use("/api", accRoutes);
app.use("/api", tourRoutes);

// Error handling Middleware
app.use(errorHandling);

//Create Table before starting server
// createUserTable();
// createAccTable();

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
