import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Neon drops idle connections; catch the error so the process doesn't crash.
pool.on("error", (err) => {
    console.error("Idle pool client error:", err.message);
});

export default pool;

