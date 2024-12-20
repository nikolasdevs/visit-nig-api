import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)
  `;
  try {
    pool.query(queryText);
    console.log("User table created successfully if not existing");
  } catch (error) {
    console.log("User table created failed", error);
  }
};

export default createUserTable;
