require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const contact = require("./routes/contact");
const newsletter = require("./routes/newsletter");
const gallery = require("./routes/gallery");
const conn = require("./conn/conn");

// Connect to MongoDB
conn();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1", contact);
app.use("/api/v1", newsletter);
app.use("/api/v1/gallery", gallery);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
