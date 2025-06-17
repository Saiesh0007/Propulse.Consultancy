const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { data: Buffer, contentType: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
