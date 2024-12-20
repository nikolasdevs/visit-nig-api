CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)




DO $$
BEGIN
  -- Create ENUM type for accommodation types if it doesn't exist
  CREATE TYPE accommodation_type AS ENUM ('Hotel', 'Airbnb', 'Resort', 'Apartment', 'Other');
EXCEPTION
  WHEN DUPLICATE_OBJECT THEN
    -- Skip creation if the ENUM already exists
    NULL;
END $$;

-- Create the accommodations table if it doesn't exist
CREATE TABLE IF NOT EXISTS accommodations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  address VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type accommodation_type NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);


