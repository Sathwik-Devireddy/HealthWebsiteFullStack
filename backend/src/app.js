const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const citizenRoutes = require("./routes/citizen.routes");

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(helmet()); // Security headers
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

/* -------------------- Routes -------------------- */
app.use("/api/citizens", citizenRoutes);

/* -------------------- Health Check -------------------- */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "One Health Card API is running",
  });
});

module.exports = app;
