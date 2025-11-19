const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

app.get("/", async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM links");
    res.json(result.rows);
  } catch (error) {
    console.error("DB ERROR:", error);
    return res.status(500).json({ error: "Database connection failed" });
  } finally {
    client.release();
  }
});

app.listen(PORT, console.log("Server running on port:", PORT));
