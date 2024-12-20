import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

//console.log(process.env.DB_USER);
//console.log(process.env.DB_HOST);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

export default pool;
