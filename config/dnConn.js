require('dotenv').config(); // Load environment variables from .env

const { Pool } = require('pg');

// Get the connection string from the .env file
const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB SSL connections
  },
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL (NeonDB)"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool; // Export for reuse in queries
