// File: server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require("./routes/auth");
const habitRoutes = require("./routes/habits");
const logRoutes = require("./routes/logs");

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/logs", logRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
