const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("✅ Connected to Database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = conn;
