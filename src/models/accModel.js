import pool from "../config/db.js";

export const getAllAccService = async () => {
  const result = await pool.query("SELECT * FROM accommodations");
  return result.rows;
};

export const getAccByIdService = async (id) => {
  const result = await pool.query(
    "SELECT * FROM accommodations WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const getAccByTypeService = async (type) => {
  const result = await pool.query(
    "SELECT * FROM accommodations WHERE type = $1",
    [type]
  );

  return result.rows;
};

export const createAccService = async (name, address, description, type) => {
  const result = await pool.query(
    "INSERT INTO accommodations (name, address, description, type) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, address, description, type]
  );
  return result.rows[0];
};

export const updateAccService = async (
  id,
  name,
  address,
  description,
  type
) => {
  const result = await pool.query(
    "UPDATE accommodations SET name = $1, address = $2, description = $3, type = $4 WHERE id = $5 RETURNING *",
    [name, address, description, type, id]
  );
  return result.rows[0];
};

export const deleteAccService = async (id) => {
  const result = await pool.query(
    "DELETE FROM accommodations WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
