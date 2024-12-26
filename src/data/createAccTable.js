// import pool from "../config/db.js";

// const createAccTable = async () => {
//   const queryText = `

//   DO $$
//   BEGIN
//     -- Create ENUM type for accommodation types if it doesn't exist
//       CREATE TYPE accommodation_type AS ENUM ('Hotel', 'Airbnb', 'Resort', 'Apartment', 'Other');
//   EXCEPTION
//     WHEN DUPLICATE_OBJECT THEN
//       -- Skip creation if the ENUM already exists
//       NULL;
//     END $$;
  
// CREATE TABLE IF NOT EXISTS accommodations (
//   id SERIAL PRIMARY KEY,
//   name varchar(255) UNIQUE NOT NULL,
//   address varchar(255)  NOT NULL,
//   description varchar(255)  NOT NULL,
//   type accommodation_type,
//   created_at TIMESTAMP DEFAULT NOW()
// )
//   `;
//   try {
//     pool.query(queryText);
//     console.log(
//       "Accommodation table and ENUM type created successfully if not existing"
//     );
//   } catch (error) {
//     console.log("Accommodation table creation failed", error);
//   }
// };

// export default createAccTable;
