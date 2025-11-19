const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const linkRoutes = require("./src/routes/link.route");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// app.get("/", async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const result = await client.query("SELECT * FROM links");
//     res.json(result.rows);
//   } catch (error) {
//     console.error("DB ERROR:", error);
//     return res.status(500).json({ error: "Database connection failed" });
//   } finally {
//     client.release();
//   }
// });


app.get("/healthz", (req, res) => res.status(200).send("OK"));
app.use("/api", linkRoutes);

app.listen(PORT, console.log("Server running on port:", PORT));
